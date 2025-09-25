import { connectMongoNative } from "@/lib/dbNative";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    const db = await connectMongoNative();

    const result = await db.collection("applications").insertOne(data);

    return NextResponse.json({ success: true, message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error saving application:", error);
    return NextResponse.json({ success: false, message: "Failed to submit application." }, { status: 500 });
  }
}
