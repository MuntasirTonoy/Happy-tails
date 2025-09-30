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

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const db = await connectMongoNative();
    const result = await db.collection("shelter").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          shelterName: body.shelterName,
          location: body.location,
          contactEmail: body.contactEmail,
          contactPhone: body.contactPhone,
          shelterImage: body.shelterImage || null,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Shelter not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Shelter updated successfully!",
    });
  } catch (err) {
    console.error("Error updating shelter:", err);
    return NextResponse.json(
      { success: false, message: "Failed to update shelter." },
      { status: 500 }
    );
  }
}

