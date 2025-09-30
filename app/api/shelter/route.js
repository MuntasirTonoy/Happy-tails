import { connectMongoNative } from "@/lib/dbNative";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    const { shelterName, location, contactEmail, contactPhone, shelterImage } = data;

    if (!shelterName || !location || !contactEmail || !contactPhone) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const db = await connectMongoNative();

    const newShelter = {
      shelterName,
      location,
      contactEmail,
      contactPhone,
      shelterImage: shelterImage || null,
      createdAt: new Date(),
    };

    const result = await db.collection("shelter").insertOne(newShelter);

    return NextResponse.json({
      success: true,
      message: "Shelter created successfully!",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Error saving shelter:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create shelter." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await connectMongoNative();
    const shelters = await db.collection("shelter").find({}).toArray();

    return NextResponse.json({
      success: true,
      data: shelters,
    });
  } catch (error) {
    console.error("Error fetching shelters:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch shelters." },
      { status: 500 }
    );
  }
}

