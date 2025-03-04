// const Task = require("../models/tasks");

// // Get all tasks
// exports.getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find().populate(
//       "assignedTo assignedBy",
//       "name email role"
//     );
//     res.status(200).json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Create a new task (only Admins & Managers can assign)
// exports.createTask = async (req, res) => {
//   if (req.user.role !== "Admin" && req.user.role !== "Account Manager") {
//     return res
//       .status(403)
//       .json({ message: "Only Admins or Managers can assign tasks" });
//   }

//   try {
//     const {
//       title,
//       assignedTo,
//       assignedClient,
//       startDate,
//       dueDate,
//       endDate,
//       priority,
//     } = req.body;
//     const task = await Task.create({
//       title,
//       assignedTo,
//       assignedBy: req.user._id,
//       assignedClient, // Ensure this is defined in req.body
//       startDate, // Ensure this is defined in req.body
//       dueDate,
//       endDate,
//       priority,
//     });

//     res.status(201).json(task);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update Task (Only Admins & Managers can update)
// exports.updateTask = async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) return res.status(404).json({ message: "Task not found" });

//     if (req.user.role !== "Admin" && req.user.role !== "Account Manager") {
//       return res
//         .status(403)
//         .json({ message: "Only Admins or Managers can update tasks" });
//     }

//     Object.assign(task, req.body);
//     await task.save();
//     res.json(task);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete Task (Only Admins & Managers)
// exports.deleteTask = async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) return res.status(404).json({ message: "Task not found" });

//     if (req.user.role !== "Admin" && req.user.role !== "Account Manager") {
//       return res
//         .status(403)
//         .json({ message: "Only Admins or Managers can delete tasks" });
//     }

//     await task.deleteOne();
//     res.json({ message: "Task deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const Task = require("../models/tasks");
const User = require("../models/users");
// Create a new task
// Create Task
exports.createTask = async (req, res) => {
  try {
    const {
      title,
      eventType,
      assignedTo,
      assignedBy,
      assignedClient,
      startDate,
      dueDate,
      endDate,
      description,
      status,
      priority,
    } = req.body;

    // Validate assigned user (editor)
    // Check if the assigned user exists
    const assignedUser = await User.findOne({ firebaseUID: assignedTo });
    if (!assignedUser) {
      return res.status(400).json({ error: "Assigned user not found" });
    }
    // Validate assignedBy (task creator)
    const assignedByUser = await User.findOne({ firebaseUID: assignedBy });
    if (!assignedByUser)
      return res.status(404).json({ message: "Assigned by user not found" });

    const newTask = new Task({
      title,
      eventType,
      assignedTo: assignedUser._id,
      assignedBy: assignedByUser._id,
      assignedClient,
      startDate,
      dueDate,
      endDate,
      description,
      status,
      priority,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo assignedBy assignedClient",
      "name email"
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate(
      "assignedTo assignedBy assignedClient",
      "name email"
    );
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
