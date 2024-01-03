const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");

// Admin Routes
<<<<<<< HEAD
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
=======
router.post('/signup', (req, res) => {
    // Implement admin signup logic
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
>>>>>>> upstream/master
});

module.exports = router;
