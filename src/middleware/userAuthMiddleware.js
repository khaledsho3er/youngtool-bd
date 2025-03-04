const jwt = require("jsonwebtoken");

exports.authenticateUser = (req, res, next) => {
  const token = req.cookies.session;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No session found" });
  }

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized - Invalid session" });
  }
};
exports.isManagerOrAdmin = (req, res, next) => {
  if (req.user.role === "Admin" || req.user.role === "Account Manager") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden: Only Admins or Managers can assign tasks" });
  }
};