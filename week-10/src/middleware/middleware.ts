import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/config";

interface AuthRequest extends Request {
  userId?: number;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({
        message: "Invalid Token",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    req.userId = parseInt(decoded.userId, 10);

    next();
  } catch (error) {
    console.log("Authentication error :" + error);
    return res.status(500).json({
      message: "Authentication error",
    });
  }
};
