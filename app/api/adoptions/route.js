import { connectMongoNative } from "@/lib/dbNative";
import { fixStatuses } from "@/lib/fixStatuses";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await fixStatuses();

    const db = await connectMongoNative();
    const applications = await db.collection("applications").find({}).toArray();

    return NextResponse.json({ success: true, data: applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { success: false, data: [], message: "Failed to fetch applications." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    const newApplication = {
      ...data,
      status: "pending",
      createdAt: new Date(),
    };

    const db = await connectMongoNative();
    const result = await db.collection("applications").insertOne(newApplication);

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully!",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Error saving application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit application." },
      { status: 500 }
    );
  }
}
