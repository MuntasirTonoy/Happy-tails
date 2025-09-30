import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Shelter from "../../../models/Shelter";

export async function POST(req) {
  await connectDB();
  try {
    const data = await req.json();
    const shelter = await Shelter.create(data);
    return NextResponse.json(shelter, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  try {
    const shelters = await Shelter.find().sort({ createdAt: -1 });
    return NextResponse.json(shelters);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  await connectDB();
  try {
    const { id, ...rest } = await req.json();
    const shelter = await Shelter.findByIdAndUpdate(id, rest, { new: true });
    return NextResponse.json(shelter);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectDB();
  try {
    const { id } = await req.json();
    await Shelter.findByIdAndDelete(id);
    return NextResponse.json({ message: "Shelter deleted" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
