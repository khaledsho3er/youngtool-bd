const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../Controllers/userController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/register", verifyToken, registerUser);
router.post("/login", loginUser);
router.get("/users", getAllUsers);

module.exports = router;
