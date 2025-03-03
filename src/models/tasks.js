const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignedClient:{ type: mongoose.Schema.Types.ObjectId, ref: "client"},
  startDate : {type:Date, required:true},
  dueDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);
