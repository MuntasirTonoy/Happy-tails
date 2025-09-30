import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db.js";
import User from "@/models/userModel.js";

// optional: force Node runtime (Mongoose won't run in Edge)
export const runtime = "nodejs";

export async function POST(req) {
  try {
    // make sure DB is connected
    await connectDB();

    // parse request body (assumes JSON)
    const body = await req.json();
    const { name, email, password, profileImage, phone, address, role } = body;

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // normalize email
    const normalizedEmail = String(email).trim().toLowerCase();

    // check if user exists
    const existing = await User.findOne({ email: normalizedEmail }).lean();
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // hash password
    const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // create user
    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      profileImage: profileImage || null,
      phone,
      address,
      role: role || "user",
    });

    // remove sensitive fields before returning
    const userObj = newUser.toObject();
    delete userObj.password;
    delete userObj.__v;

    return NextResponse.json({ user: userObj }, { status: 201 });
  } catch (err) {
    console.error("Register error:", err);

    // handle mongoose duplicate key edge case if still occurs
    if (err?.code === 11000) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
