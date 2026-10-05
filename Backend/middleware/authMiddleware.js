const jwt = require("jsonwebtoken");
const response = require("../utils/response");

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return response.error(res, "Unauthorized", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    console.log("USER FROM TOKEN:", req.user);

    return next();
  } catch (error) {
    console.error("Token verification error:", error.message);

    return response.error(res, "Invalid or expired token", 401);
  }
};

module.exports = protect;
