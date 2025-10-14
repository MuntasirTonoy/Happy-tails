import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Pet from "@/models/Pet";

// GET Single pet for admin
export async function GET(req, { params }) {
  try {
    await connectDB();

    const pet = await Pet.findById(params.id);
    if (!pet) return NextResponse.json({ error: "Pet not found" }, { status: 404 });

    return NextResponse.json(pet, { status: 200 });
  } catch (err) {
    console.error("Admin GET Pet Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

//  PATCH Update pet status
export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const body = await req.json();
    const updatedPet = await Pet.findByIdAndUpdate(
      params.id,
      { ...body },
      { new: true }
    );

    if (!updatedPet) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPet, { status: 200 });
  } catch (err) {
    console.error("Admin PATCH Pet Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

//  DELETE  Remove pet
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const deletedPet = await Pet.findByIdAndDelete(params.id);
    if (!deletedPet) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Pet deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("Admin DELETE Pet Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
