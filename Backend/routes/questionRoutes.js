const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getQuestion,
} = require("../controllers/questionController");

// Create question
router.post("/create", createQuestion);

// Get questions
router.get("/get", getQuestion);

module.exports = router;
