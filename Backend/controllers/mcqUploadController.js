const mcqUploadService = require("../services/mcqUploadService");
const response = require("../utils/response");
const uploadMCQFile = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return response.error(res, "Invalid data", 400);
    }

    // Send file information to service
    const result = await mcqUploadService.processMCQFile({
      fileName: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
    });

   return response.created(res, "Something created", result);
  } catch (error) {
    console.error("MCQ FILE UPLOAD ERROR:", error);

 return response.error(res, "...", 500);
  }
};

module.exports = {
  uploadMCQFile,
};
