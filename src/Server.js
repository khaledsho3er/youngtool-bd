require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");
const authRoutes = require("./Routes/authRoutes");
const taskRoutes = require("./Routes/taskRoutes");
const connectDB = require("./Config/db");

const app = express();
app.use(express.json());
// Enable CORS globally for all routes
app.use(
  cors({
    origin: "http://localhost:3000", // Change this to your frontend's URL

    methods: ["GET", "POST", "PUT", "DELETE"], // السماح بكل الطلبات
  })
);
connectDB();

app.use("/api/auth", authRoutes); // Use Authentication Routes
app.use("/api/users", userRoutes); // Use User Routes
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
