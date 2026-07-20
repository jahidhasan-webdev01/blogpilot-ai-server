import dotenv from "dotenv";
dotenv.config();

import connectDB from "../src/config/db";
import app from "../src/server";

let isConnected = false;

export default async function handler(req: any, res: any) {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
    }
    return app(req, res);
  } catch (error) {
    console.error("Handler error:", error);
    res.status(500).json({ error: "Server initialization failed" });
  }
}