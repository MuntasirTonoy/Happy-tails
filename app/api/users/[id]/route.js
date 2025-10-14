import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import User from "@/models/User";

export async function PATCH(req, { params }) {
  const { id } = params;
  const { status } = await req.json();

  try {
    await connectDB();
    const user = await User.findByIdAndUpdate(id, { status }, { new: true });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await connectDB();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
