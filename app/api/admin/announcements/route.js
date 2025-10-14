import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Announcement from "@/models/Announcement";

await connectDB();

export async function GET() {
  try {
    const announcements = await Announcement.find().sort({ postedAt: -1 });
    return NextResponse.json(announcements);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.title || !body.message || !body.authorId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const newAnn = await Announcement.create(body);
    return NextResponse.json(newAnn, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
