import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Pet from "@/models/Pet";

//  GET 
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const species = searchParams.get("species");
    const status = searchParams.get("status");

    const filter = {};
    if (species) filter.species = species;
    if (status) filter.status = status;

    const pets = await Pet.find(filter).sort({ createdAt: -1 });
    return NextResponse.json(pets, { status: 200 });
  } catch (err) {
    console.error("GET Pets Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

//  POST  Pet add 
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const newPet = await Pet.create(body);

    return NextResponse.json(newPet, { status: 201 });
  } catch (err) {
    console.error("POST Pet Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
