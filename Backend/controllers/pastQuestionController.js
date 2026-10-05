const pastQuestionService = require("../services/pastQuestionService");
const response = require("../utils/response");

const uploadPastQuestion = async (req, res) => {
  try {
    if (!req.file) {
      return response.error(res, "Please select a PDF or DOCX file.", 400);
    }

    const result = await pastQuestionService.uploadPastQuestion({
      fileName: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
    });

    return response.success(
      res,
      "Past question uploaded successfully.",
      result,
    );
  } catch (error) {
    console.error("PAST QUESTION UPLOAD ERROR:", error);

    return response.error(
      res,
      error.message || "Failed to upload past question.",
      error.statusCode || 500,
    );
  }
};

module.exports = {
  uploadPastQuestion,
};
