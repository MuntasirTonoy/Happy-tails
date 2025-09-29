import { connectMongoNative } from "@/lib/dbNative";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid shelter ID." },
        { status: 400 }
      );
    }

    const db = await connectMongoNative();
    const result = await db.collection("shelter").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ success: true, message: "Shelter deleted successfully!" });
    } else {
      return NextResponse.json({ success: false, message: "Shelter not found." }, { status: 404 });
    }
  } catch (err) {
    console.error("Error deleting shelter:", err);
    return NextResponse.json(
      { success: false, message: "Failed to delete shelter." },
      { status: 500 }
    );
  }
}

