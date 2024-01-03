const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");
const jwt = require("jsonwebtoken");
const jwtPassword = "shhhhh";

// Admin Routes
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(404).json({
      message: "Invalid Credentials",
    });
  }

  const existingAdmin = await Admin.findOne({ username });

  if (existingAdmin) {
    return res.status(404).json({
      message: "Admin already exists",
    });
  }

  Admin.create({ username, password });

  res.status(200).json({
    message: "Admin created successfully",
  });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(404).json({
      message: "Invalid Credentials",
    });
  }

  const existingAdmin = await Admin.findOne({ username, password });

  if (!existingAdmin) {
    return res.status(404).json({
      message: "Admin does not exists",
    });
  }

  const token = jwt.sign({ username, password }, jwtPassword);

  res.status(200).json({
    token: token,
  });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const { title, description, price, imageLink, published } = req.body;

  const course = await Course.create({
    title,
    description,
    price,
    imageLink,
    published,
  });

  res.status(200).json({
    message: "Course created successfully",
    courseId: course._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const courses = await Course.find();

  res.status(200).json({
    courses: courses,
  });
});

module.exports = router;
