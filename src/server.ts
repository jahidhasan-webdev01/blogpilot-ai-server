import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

// Only run a persistent server locally.
// On Vercel, requests are handled by api/index.ts instead.
if (process.env.VERCEL !== "1") {
  startServer();
}

export default app;