import { connectMongoNative } from "@/lib/dbNative";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json(); 

    const db = await connectMongoNative();
    const result = await db
      .collection("applications")
      .updateOne({ _id: new ObjectId(id) }, { $set: { status: data.status } });

    if (result.modifiedCount === 1) {
      return NextResponse.json({ success: true, message: "Status updated!" });
    } else {
      return NextResponse.json({ success: false, message: "Application not found" }, { status: 404 });
    }
  } catch (err) {
    console.error("Error updating status:", err);
    return NextResponse.json({ success: false, message: "Failed to update status" }, { status: 500 });
  }
}
