import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return; // already connected, reuse in serverless
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed", error);
    throw error; // let the caller handle it, don't kill the process
  }
};

export default connectDB;