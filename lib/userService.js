import { connectDB } from "@/lib/db";
import User from "@/models/userModel.js";

export async function getUserByEmail(email) {
  await connectDB();
  const user = await User.findOne({ email }).lean();
  return user;
}
