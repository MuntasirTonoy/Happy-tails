import { connectDB } from "@/lib/db";
import Application from "@/models/Application";

export async function GET() {
  try {
    await connectDB();

    const apps = await Application.find({}).sort({ createdAt: -1 });

    const formatted = apps.map(a => ({
      _id: a._id.toString(),
      applicationType: a.applicationType,
      experience: a.experience,
      livingSituation: a.livingSituation,
      reason: a.reason,
      references: a.references,
      visitDate: a.visitDate,
      status: a.status,
      createdAt: a.createdAt,
    }));

    return new Response(JSON.stringify(formatted), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET /applications error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch applications" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
