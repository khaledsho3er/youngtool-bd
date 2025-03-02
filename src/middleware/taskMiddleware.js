const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.isManagerOrAdmin = (req, res, next) => {
  if (req.user.role === "Admin" || req.user.role === "Account Manager") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden: Only Admins or Managers can assign tasks" });
  }
};
