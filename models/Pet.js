import mongoose from "mongoose";

const PetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    species: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    size: { type: String, enum: ["Small", "Medium", "Large"] },
    vaccinated: { type: Boolean, default: false },
    neutered: { type: Boolean, default: false },
    healthInfo: { type: String },
    status: { type: String, enum: ["Available", "Adopted"], default: "Available" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Pet || mongoose.model("Pet", PetSchema);
