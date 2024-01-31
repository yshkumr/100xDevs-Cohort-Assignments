const { Router } = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../config/db");
const { JWT_SECRET } = require("../config/config");
const { authMiddleware } = require("../middleware/middleware");

const router = Router();

const signUpCheck = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

const signInCheck = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

const updateInfoCheck = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
  const validInps = signUpCheck.safeParse(req.body);

  if (!validInps.success) {
    return res.status(400).json({
      message: "Invalid Input",
    });
  }

  const { firstName, lastName, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already registered",
    });
  }

  const user = await User.create({ firstName, lastName, email, password });

  const userId = user._id;

  const token = jwt.sign({ userId }, JWT_SECRET);

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  res.status(200).json({
    message: "User created successfully",
    token,
  });
});

router.post("/signin", async (req, res) => {
  const validInps = signInCheck.safeParse(req.body);

  if (!validInps.success) {
    return res.status(400).json({
      message: "Invalid Input",
    });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(411).json({
      message: "Incorrect email or password",
    });
  }

  const userId = user._id;

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.status(200).json({
    message: "Signed In Successfully",
    token,
  });
});

router.put("/updateuser", authMiddleware, async (req, res) => {
  const validInps = updateInfoCheck.safeParse(req.body);

  if (!validInps.success) {
    res.status(400).json({
      message: "Invalid Input",
    });
  }

  try {
    await User.updateOne({ _id: req.userId }, req.body);

    res.status(200).json({
      msg: "User updated successfull",
    });
  } catch (error) {
    console.error("Error updating user: " + error);
  }
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const { filter } = req.query || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: filter,
          $options: "i",
        },
      },
    ],
  });

  res.status(200).json({
    users: users.map((usr) => ({
      firstName: usr.firstName,
      lastName: usr.lastName,
      email: usr.email,
      _id: usr._id,
    })),
  });
});

router.get("/userinfo", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    return res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
