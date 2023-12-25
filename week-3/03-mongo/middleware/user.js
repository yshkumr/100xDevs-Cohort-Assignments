const { User } = require("../db");

async function userMiddleware(req, res, next) {
  const { username, password } = req.headers;

  const existingUser = await User.findOne({ username, password });

  if (!existingUser) {
    return res.send(404).json({
      message: "Unauthorized",
    });
  }

  next();
}

module.exports = userMiddleware;
