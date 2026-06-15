require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const issueRoutes = require("./routes/issueRoutes");
const studentRoutes =require("./routes/studentRoutes");
const dashboardRoutes =require("./routes/dashboardRoutes");

const app = express();

// Connect MongoDB
connectDB();

// Middleware FIRST
app.use(
  cors({
    origin: ["http://localhost:5173", "https://vedantslibraryhub.onrender.com"],credentials: true
  })
);

app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Library Management API Running");
});

// Routes AFTER middleware
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/dashboard", dashboardRoutes);
// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});