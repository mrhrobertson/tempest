"use server";

import { Furnace, toBase64URL, toUint8Array } from "@mrhrobertson/furnace";
import { randomBytes, randomUUID } from "crypto";
import { RedisClientOptions, createClient } from "redis";

type SubmitPayload = {
  content: string;
  amount: number;
  period: string;
};

type RevealPayload = {
  uuid: string;
  key: string;
};

type DecodeResponse = {
  token: string;
  amount: number;
  period: string;
};

const TIME_CONVERSION: { [id: string]: number } = {
  h: 3600,
  d: 86400,
  w: 604800,
};

const REDIS_CFG = {
  url: process.env.REDIS_URL
    ? process.env.REDIS_URL
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
  await client.set(
    `tempest:${uuid}`,
    JSON.stringify({
      token: toBase64URL(token),
      amount: payload.amount,
      period: payload.period,
    })
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
  } catch (e) {
    return null;
  }
  if (res) {
    const json: DecodeResponse = JSON.parse(res);
    try {
      var decoded = furnace.decode(
        toUint8Array(json.token),
        TIME_CONVERSION[json.period] * json.amount
      );
    } catch (error) {
      await client.disconnect();
      return null;
    }
    await client.del(`tempest:${payload.uuid}`);
    await client.disconnect();
    return decoded;
  } else return null;
}
