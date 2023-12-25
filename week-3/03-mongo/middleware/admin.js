const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  const { username, password } = req.headers;

  const existingAdmin = await Admin.findOne({ username, password });

  if (!existingAdmin) {
    return res.status(404).json({
      message: "Unauthorized",
    });
  }

  next();
}

module.exports = adminMiddleware;
