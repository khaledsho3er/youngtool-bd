const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
exports.isManagerOrAdmin = (req, res, next) => {
  if (req.user.role === "Admin" || req.user.role === "Account Manager") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden: Only Admins or Managers can assign tasks" });
  }
};