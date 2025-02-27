const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/verify", verifyToken, authController.verifyUser); // Protected Route

module.exports = router;
