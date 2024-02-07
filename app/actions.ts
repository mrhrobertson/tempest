"use server";

import { Furnace, toBase64URL, toUint8Array } from "@mrhrobertson/furnace";
import { randomBytes, randomUUID } from "crypto";
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
  const token = furnace.encode(payload.content);
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
    console.log(`${uuid}: ${error}`);
    return null;
  }
  console.log(
    `Created ${uuid} | TTL: ${payload.amount}${payload.period} | Clicks: ${payload.clicks}`
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
    console.log(`${payload.uuid}: ${error}`);
    return null;
  }
  if (res) {
    const json: DecodeResponse = JSON.parse(res);
    console.log(
      `Decoded ${payload.uuid} | TTL: ${json.amount}${json.period} | Clicks: ${json.clicks}`
    );
    try {
      var decoded = furnace.decode(
        toUint8Array(json.token),
        TIME_CONVERSION[json.period] * json.amount
      );
    } catch (error) {
      await client.disconnect();
      console.log(`${payload.uuid}: ${error}`);
      return null;
    }
    if (json.clicks - 1 == 0) {
      console.log(`Deleting ${payload.uuid}, no more clicks allowed.`);
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
        `Updated ${payload.uuid} | TTL: ${json.amount}${
          json.period
        } | Clicks: ${json.clicks - 1}`
      );
    }
    await client.disconnect();
    return decoded;
  } else {
    await client.disconnect();
    return null;
  }
}
