import { connectDB } from "@/lib/db";
import Shelter from "@/models/Shelter";
import { uploadMultiple } from "@/lib/imbb";

export async function GET() {
  try {
    await connectDB();
    const shelters = await Shelter.find({});
    return new Response(JSON.stringify(shelters), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}




export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    let imageURLs = [];
    if (body.images && body.images.length > 0) {
      imageURLs = await uploadMultiple(body.images);
    }

    const newShelter = await Shelter.create({ ...body, images: imageURLs });
    return new Response(JSON.stringify(newShelter), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
