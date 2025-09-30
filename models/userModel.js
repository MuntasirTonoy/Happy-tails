import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
    profileImage: { type: String, default: null },

    role: { type: String, enum: ["user", "admin"], default: "user" },
    phone: { type: String },
    address: { type: String },
    ownedShelterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shelter",
      default: null,
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
