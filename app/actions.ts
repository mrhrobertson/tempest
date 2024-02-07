"use server";

import { Furnace, toBase64URL, toUint8Array } from "@mrhrobertson/furnace";
import { randomBytes, randomUUID } from "crypto";
import moment from "moment";
import { RedisClientOptions, createClient } from "redis";

type SubmitPayload = {
  content: string;
  amount: number;
  period: string;
  clicks: number;
};

type RevealPayload = {
  uuid: string;
  key: string;
};

type DecodeResponse = {
  token: string;
  amount: number;
  period: string;
  clicks: number;
};

const TIME_CONVERSION: { [id: string]: number } = {
  h: 3600,
  d: 86400,
  w: 604800,
};

const REDIS_CFG = {
  url: process.env.REDIS_URL
    ? `redis://${process.env.REDIS_URL}:6379`
    : process.env.KV_URL
    ? process.env.KV_URL
    : "redis://localhost:6379",
  socket: { tls: process.env.TLS ? process.env.TLS : true },
};

export async function submit(payload: SubmitPayload) {
  const key = new Uint8Array(randomBytes(32));
  const furnace = new Furnace(key);
  var token: Uint8Array;
  try {
    token = furnace.encode(payload.content) as Uint8Array;
  } catch (error) {
    console.error(error);
    return null;
  }
  const client = createClient(REDIS_CFG as RedisClientOptions);
  const uuid = randomUUID();
  const keyB64 = toBase64URL(key);
  await client.connect();
  try {
    await client.set(
      `tempest:${uuid}`,
      JSON.stringify({
        token: toBase64URL(token),
        amount: payload.amount,
        period: payload.period,
        clicks: payload.clicks,
      })
    );
  } catch (error) {
    console.error(`[${moment().toLocaleString()}] ${uuid}: ${error}`);
    return null;
  }
  console.info(
    `[${moment().toLocaleString()}] TEMPEST: Created ${uuid} | TTL: ${
      payload.amount
    }${payload.period}/${
      payload.amount * TIME_CONVERSION[payload.period]
    } | Clicks: ${payload.clicks}`
  );
  await client.disconnect();
  return `${uuid}~${keyB64}`;
}

export async function revealSecret(payload: RevealPayload) {
  const key = toUint8Array(payload.key);
  const furnace = new Furnace(key);
  const client = createClient(REDIS_CFG as RedisClientOptions);
  await client.connect();
  try {
    var res = await client.get(`tempest:${payload.uuid}`);
  } catch (error) {
    console.error(
      `[${moment().toLocaleString()}] TEMPEST: Unable to find ${payload.uuid}.`
    );
    return null;
  }
  if (res) {
    const json: DecodeResponse = JSON.parse(res);
    console.info(
      `[${moment().toLocaleString()}] TEMPEST: Decoded ${payload.uuid} | TTL: ${
        json.amount
      }${json.period}/${json.amount * TIME_CONVERSION[json.period]} | Clicks: ${
        json.clicks
      }`
    );
    try {
      var decoded = furnace.decode(
        toUint8Array(json.token),
        TIME_CONVERSION[json.period] * json.amount
      );
    } catch (error) {
      await client.disconnect();
      console.error(
        `[${moment().toLocaleString()}] TEMPEST: Failed to decode ${
          payload.uuid
        }.`
      );
      return null;
    }
    if (json.clicks - 1 == 0) {
      console.log(
        `[${moment().toLocaleString()}] TEMPEST: Deleting ${
          payload.uuid
        }, no more clicks allowed.`
      );
      await client.del(`tempest:${payload.uuid}`);
    } else {
      await client.set(
        `tempest:${payload.uuid}`,
        JSON.stringify({
          token: json.token,
          amount: json.amount,
          period: json.period,
          clicks: json.clicks - 1,
        })
      );
      console.log(
        `[${moment().toLocaleString()}] TEMPEST: Updated ${
          payload.uuid
        } | TTL: ${json.amount}${json.period}/${
          json.amount * TIME_CONVERSION[json.period]
        } | Clicks: ${json.clicks - 1}`
      );
    }
    await client.disconnect();
    return decoded;
  } else {
    await client.disconnect();
    console.error(
      `[${moment().toLocaleString()}] TEMPEST: Couldn't find ${
        payload.uuid
      } in database, likely expired or never existed.`
    );
    return null;
  }
}
