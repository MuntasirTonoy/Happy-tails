import axios from "axios";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    // Convert Blob → Base64
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString("base64");

    // ✅ Fix: Send to ImgBB with proper FormData, not JSON
    const imgbbFormData = new FormData();
    imgbbFormData.append("image", base64Image);

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      imgbbFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // ✅ Add proper error handling for ImgBB response
    if (!response.data.success) {
      console.error("ImgBB API error:", response.data.error);
      return new Response(
        JSON.stringify({
          error: response.data.error.message || "ImgBB upload failed",
        }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ url: response.data.data.url }), {
      status: 200,
    });
  } catch (error) {
    console.error("ImgBB upload error:", error);

    // ✅ Better error response
    const errorMessage =
      error.response?.data?.error?.message || error.message || "Upload failed";

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}
