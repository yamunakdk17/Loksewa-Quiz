const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {uploadMCQFile,} = require("../controllers/mcqUploadController");

// Upload MCQ PDF/DOCX 
router.post("/upload",protect,allowRoles("admin"),upload.single("file"),uploadMCQFile);

module.exports = router;