import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Announcement from "@/models/Announcement";

await connectDB();

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const updated = await Announcement.findByIdAndUpdate(id, body, { new: true });
    if (!updated) return NextResponse.json({ error: "Announcement not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const deleted = await Announcement.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Announcement not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
