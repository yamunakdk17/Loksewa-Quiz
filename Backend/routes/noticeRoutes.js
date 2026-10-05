const express = require("express");

const router = express.Router();

const {
  getAllNotices,
  getNoticeById,
  getNoticesBySector,
  createNotice,
  updateNotice,
  deleteNotice,
} = require("../controllers/noticeController");

const upload = require("../middleware/uploadNoticeMiddleware");

// Get all notices
router.get("/", getAllNotices);

// Get notices by sector
router.get("/sector/:sector", getNoticesBySector);

// Get single notice
router.get("/:id", getNoticeById);

// Create notice with PDF
router.post("/create", upload, createNotice);

// Update notice with PDF
router.put("/:id", upload, updateNotice);

// Delete notice
router.delete("/:id", deleteNotice);

module.exports = router;
