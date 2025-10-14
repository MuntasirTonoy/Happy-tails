import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "petadoption", 
    });
    isConnected = true;
    console.log("✅ MongoDB Connected via Mongoose");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};
