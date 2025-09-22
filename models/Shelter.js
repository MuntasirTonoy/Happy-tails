import mongoose from "mongoose";

const ShelterSchema = new mongoose.Schema({
  shelterName: { type: String, required: true },
  location: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  images: [{ type: String }],
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  ownerName: { type: String, required: true },
  ownerEmail: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Shelter || mongoose.model("Shelter", ShelterSchema);
