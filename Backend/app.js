const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const pastQuestionRoutes = require("./routes/pastQuestionRoutes");
const noticeRoutes = require("./routes/noticeRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static files
app.use("/uploads", express.static("uploads"));

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Loksewa Quiz API is running",
  });
});
console.log(Date.now())

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/admin/past-questions", pastQuestionRoutes);
app.use("/api/notices", noticeRoutes);

module.exports = app;
