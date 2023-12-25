const jwt = require("jsonwebtoken");
const jwtPassword = "shhhhh";

function userMiddleware(req, res, next) {
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

module.exports = userMiddleware;
