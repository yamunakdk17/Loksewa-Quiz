const express = require("express");

const router = express.Router();

const pastQuestionUpload = require("../middleware/pastQuestionMiddleware");

const { uploadPastQuestion } = require("../controllers/pastQuestionController");

const protectRoute = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

router.post("/upload",protectRoute,allowRoles("admin"),pastQuestionUpload.single("file"),uploadPastQuestion,);

module.exports = router;
