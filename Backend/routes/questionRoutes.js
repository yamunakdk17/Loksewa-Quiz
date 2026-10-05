const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getQuestion,
} = require("../controllers/questionController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");



// Create question -admin only 
router.post("/create", protect, allowRoles("admin"), createQuestion);
// Get questions
router.get("/get", getQuestion);


module.exports = router;
