const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(404).json({
      message: "Invalid Credentials",
    });
  }

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(404).json({
      message: "User already exists",
    });
  }

  User.create({ username, password });

  res.status(200).json({
    message: "User created successfully",
  });
});

router.get("/courses", async (req, res) => {
  const courses = await Course.find();

  res.status(200).json({
    courses: courses,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const { username, password } = req.headers;
  const { courseId } = req.params;

  const course = await Course.findById(courseId);
  const courseName = course.title;

  const user = await User.findOne({ username });

  user.purchasedCourses.push({ courseId, courseName });

  user.save();

  res.status(200).json({
    message: "Course purchased successfully",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const { username, password } = req.headers;

  const user = await User.findOne({ username });

  res.status(200).json({
    purchasedCourses: user.purchasedCourses,
  });
});

module.exports = router;
