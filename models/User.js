import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ["user", "shelter", "admin"], default: "user" },
  status: { type: String, enum: ["active", "suspended"], default: "active" },
  phone: String,
  address: String,
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
