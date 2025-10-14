import mongoose from "mongoose";

const ShelterSchema = new mongoose.Schema(
  {
    shelterName: { type: String, required: true },
    location: String,
    contactEmail: String,
    contactPhone: String,
    ownerName: String,
    ownerEmail: String,
    status: { type: String, default: "pending" }, 
  },
  { timestamps: true }
);

export default mongoose.models.Shelter ||
  mongoose.model("Shelter", ShelterSchema);
