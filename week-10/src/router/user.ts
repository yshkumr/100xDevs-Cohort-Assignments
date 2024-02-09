import { Request, Router } from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import prisma from "../config/db";
import { authMiddleware } from "../middleware/middleware";
import { JWT_SECRET } from "../config/config";

const router = Router();

const signUpCheck = zod.object({
  email: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const signInCheck = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

interface AuthRequest extends Request {
  userId?: number;
}

router.post("/signup", async (req, res) => {
  const validInps = signUpCheck.safeParse(req.body);

  if (!validInps.success) {
    return res.status(411).json({
      message: "Invalid Input",
    });
  }

  const { email, firstName, lastName, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already registered",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, firstName, lastName, password: hashedPassword },
  });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET);

  res.status(200).json({
    message: "User created successfully",
    token,
  });
});

router.post("/signin", async (req, res) => {
  const validInps = signInCheck.safeParse(req.body);

  if (!validInps.success) {
    return res.status(411).json({
      message: "Invalid Input",
    });
  }

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({
      message: "Incorrect email or password",
    });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET);

  res.status(200).json({
    message: "Signed In Successfully",
    token,
  });
});

router.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  });

  res.status(200).json({
    usersFound: users,
  });
});

router.get("/userinfo", authMiddleware, async (req: AuthRequest, res) => {
  const userId = req.userId;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  });

  res.status(200).json({
    user,
  });
});

export default router;
