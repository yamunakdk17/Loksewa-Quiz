const multer = require("multer");
const path = require("path");
const fs = require("fs");
const response = require("../utils/response");

// Upload directory
const uploadDir = path.join(__dirname, "../uploads/notices");

// Create directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// Only PDF allowed
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

// Custom upload middleware
const uploadNotice = (req, res, next) => {
  upload.single("notice_pdf")(req, res, (error) => {
    if (error) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return response.error(
          res,
          "File size must not be greater than 10 MB",
          400,
        );
      }

      return response.error(res, error.message || "File upload failed", 400);
    }

    next();
  });
};

module.exports = uploadNotice;
