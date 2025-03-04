// const express = require("express");
// const {
//   authMiddleware,
//   isManagerOrAdmin,
// } = require("../middleware/userAuthMiddleware");
// const taskController = require("../Controllers/taskController");

// const router = express.Router();

// // Routes
// router.get("/", authMiddleware, taskController.getTasks);
// router.post("/", authMiddleware, isManagerOrAdmin, taskController.createTask);
// router.put("/:id", authMiddleware, isManagerOrAdmin, taskController.updateTask);
// router.delete(
//   "/:id",
//   authMiddleware,
//   isManagerOrAdmin,
//   taskController.deleteTask
// );

// module.exports = router;
const express = require("express");
const {
  createTask,
  getTaskById,
  getAllTasks,
} = require("../Controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/tasks", verifyToken, createTask); // Requires authentication
router.get("/:id", authMiddleware, getTaskById);
router.get("/", authMiddleware, getAllTasks);

module.exports = router;
