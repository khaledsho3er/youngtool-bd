const Task = require("../models/tasks");

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo assignedBy", "name email role");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new task (only Admins & Managers can assign)
exports.createTask = async (req, res) => {
    if (req.user.role !== "Admin" && req.user.role !== "Account Manager") {
      return res.status(403).json({ message: "Only Admins or Managers can assign tasks" });
    }
  
    try {
      const { title, assignedTo, dueDate, endDate, priority } = req.body;
      const task = await Task.create({
        title,
        assignedTo,
        assignedBy: req.user._id,
        assignedClient,
        startDate,
        dueDate,
        endDate,
        priority,
      });
  
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Update Task (Only Admins & Managers can update)
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "Admin" && req.user.role !== "Account Manager") {
      return res.status(403).json({ message: "Only Admins or Managers can update tasks" });
    }

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Task (Only Admins & Managers)
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "Admin" && req.user.role !== "Account Manager") {
      return res.status(403).json({ message: "Only Admins or Managers can delete tasks" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
