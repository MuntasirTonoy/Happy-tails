import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  authorId: { type: String, required: true },
  postedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Announcement || mongoose.model("Announcement", AnnouncementSchema);
 