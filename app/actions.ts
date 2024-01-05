"use server";

import { Furnace } from "@mrhrobertson/furnace";
import { randomBytes, randomUUID } from "crypto";
import { createClient } from "redis";

type Payload = {
  content: string;
  amount: number;
  period: string;
};

type Response = {
  tokenID: string;
  key: string;
};

export async function submit(data: Payload) {
  const key = new Uint8Array(randomBytes(32));
  const furnace = new Furnace(key);
  const token = furnace.encode(data.content);
  console.log(
    `Key: ${furnace.toBase64URL(key)} | Token: ${furnace.toBase64URL(token)}`
  );
  /*const client = createClient({
    url: process.env.REDIS_URL ? process.env.REDIS_URL : "localhost:6379",
  });*/
  const uuid = randomUUID();
  const keyB64 = furnace.toBase64URL(key);
  /*await client.connect();
  await client.json.set(`tempest:${uuid}`, "$", {
    token: furnace.toBase64URL(token),
    amount: data.amount,
    period: data.period,
    key: keyB64,
  });*/
  return `${uuid}~${keyB64}`;
}
