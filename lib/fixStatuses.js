import { connectMongoNative } from "@/lib/dbNative";

export async function fixStatuses() {
  const db = await connectMongoNative();
  const result = await db.collection("applications").updateMany(
    { status: { $exists: false } },
    { $set: { status: "pending" } }
  );

  console.log(`${result.modifiedCount} applications updated.`);
}
