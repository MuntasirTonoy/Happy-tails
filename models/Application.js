import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  applicationType: { type: String, default: "" }, // "pet" | "shelter"
  experience: { type: String, default: "" },
  livingSituation: { type: String, default: "" },
  reason: { type: String, default: "" },
  references: { type: String, default: "" },
  visitDate: { type: Date, default: null },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Application || mongoose.model("Application", ApplicationSchema);
