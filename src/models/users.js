const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firebaseUID: { type: String, required: true, unique: true }, // Firebase UID
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["admin", "manager", "editor", "client"],
    default: "client",
  },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  status: { type: String, enum: ["active", "blocked"], default: "active" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
