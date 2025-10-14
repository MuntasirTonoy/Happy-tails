import { MongoClient } from "mongodb";

let client;
let db;

export const connectMongoNative = async () => {
  if (db) return db;

  client = new MongoClient(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000, 
  });

  await client.connect();
  db = client.db("petadoption");
  console.log("✅ Native MongoDB Connected");
  return db;
};
