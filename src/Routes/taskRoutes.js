const express = require("express");
const { authMiddleware, isManagerOrAdmin } = require("../middleware/userAuthMiddleware");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, isManagerOrAdmin, createTask);
router.put("/:id", authMiddleware, isManagerOrAdmin, updateTask);
router.delete("/:id", authMiddleware, isManagerOrAdmin, deleteTask);

module.exports = router;
