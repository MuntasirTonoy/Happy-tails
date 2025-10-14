import { connectDB } from "@/lib/db";
import Shelter from "@/models/Shelter";

export async function GET(req) {
  try {
    await connectDB();
    const { id } = req.params;
    const shelter = await Shelter.findById(id);
    if (!shelter) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    return new Response(JSON.stringify(shelter), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const { id } = req.params;
    const body = await req.json();
    const updated = await Shelter.findByIdAndUpdate(id, body, { new: true });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = req.params;
    await Shelter.findByIdAndDelete(id);
    return new Response(JSON.stringify({ message: "Deleted" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
