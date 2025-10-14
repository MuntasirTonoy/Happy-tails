import { connectDB } from "@/lib/db";
import Shelter from "@/models/Shelter";

// GET Shelter by ID
export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const id = segments[segments.length - 1];

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });
    }

    const shelter = await Shelter.findById(id);
    if (!shelter) {
      return new Response(JSON.stringify({ error: "Shelter not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(shelter), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// PATCH  Update Shelter
export async function PATCH(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const id = segments[segments.length - 1];

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });
    }

    const body = await req.json();
    const updatedShelter = await Shelter.findByIdAndUpdate(id, body, { new: true });

    if (!updatedShelter) {
      return new Response(JSON.stringify({ error: "Shelter not found" }), { status: 404 });
    }


    return new Response(JSON.stringify(updatedShelter), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// DELETE Shelter
export async function DELETE(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const id = segments[segments.length - 1];

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });
    }

    const deleted = await Shelter.findByIdAndDelete(id);
    if (!deleted) {
      return new Response(JSON.stringify({ error: "Shelter not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Shelter deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
