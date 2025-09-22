// lib/dbNative.js
import { MongoClient } from "mongodb";

let client;
let db;

export const connectMongoNative = async () => {
  if (db) return db; // reuse existing connection

  client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  db = client.db("petadoption");
  console.log("✅ Native MongoDB Connected");
  return db;
};
