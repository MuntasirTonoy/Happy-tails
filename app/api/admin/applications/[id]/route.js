import { connectDB } from "@/lib/db";
import Application from "@/models/Application";

export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const { status, adminUid } = await req.json();

    if (!status) {
      return new Response(JSON.stringify({ error: "Missing status" }), { status: 400 });
    }

    const app = await Application.findByIdAndUpdate(
      id,
      {
        status,
        decisionBy: adminUid,    
        decisionAt: new Date(),     
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!app) {
      return new Response(JSON.stringify({ error: "Not updated" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, updatedApp: app }), { status: 200 });
  } catch (err) {
    console.error("PATCH /applications/[id] error:", err);
    return new Response(JSON.stringify({ error: "Failed to update" }), { status: 500 });
  }
}
