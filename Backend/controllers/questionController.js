// quiz question add section handler

const questionService = require("../services/questionService");
const response = require("../utils/response");

// Create question
const createQuestion = async (req, res) => {
  try {
    const questionData = req.body;

    const result = await questionService.createQuestion(questionData);

    return response.created(res, "Question created successfully", {
      questionId: result.insertId,
    });
  } catch (error) {
    console.error("Create question error:", error);

    return response.error(
      res,
      error.message || "Failed to create question",
      error.statusCode || 500,
    );
  }
};

// Get questions
const getQuestion = async (req, res) => {
  try {
    const questions = await questionService.getQuestion();

    return response.success(res, "Questions fetched successfully", {
      count: questions.length,
      questions,
    });
  } catch (error) {
    console.error("Get questions error:", error);

    return response.error(
      res,
      error.message || "Failed to get questions",
      error.statusCode || 500,
    );
  }
};

module.exports = {
  createQuestion,
  getQuestion,
};
