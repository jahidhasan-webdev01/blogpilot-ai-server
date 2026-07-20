import dotenv from "dotenv";
dotenv.config();

import connectDB from "../src/config/db";
import app from "../src/server";

let isConnected = false;

export default async function handler(req: any, res: any) {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  return app(req, res);
}