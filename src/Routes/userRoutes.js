const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  checkSession,
} = require("../Controllers/userController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/register", verifyToken, registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-session", checkSession);

module.exports = router;
