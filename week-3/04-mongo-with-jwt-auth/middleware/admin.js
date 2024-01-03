const jwt = require("jsonwebtoken");
const jwtPassword = "shhhhh";

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(404).json({
      message: "No Token",
    });
  }

  try {
    jwt.verify(token, jwtPassword);
    next();
  } catch (error) {
    res.status(404).json({
      message: "Invalid Token",
    });
  }
}

module.exports = adminMiddleware;
