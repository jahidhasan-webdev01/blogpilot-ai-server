import { Request, Response, NextFunction } from "express";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth, DecodedIdToken } from "firebase-admin/auth";

// 1. Extend Express's global Request interface so req.user is recognized everywhere
declare global {
  namespace Express {
    interface Request {
      user?: DecodedIdToken;
    }
  }
}

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

// 2. Use standard Request in the function signature
export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await getAuth().verifyIdToken(token);

    // TypeScript now allows this smoothly!
    req.user = decodedToken;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};