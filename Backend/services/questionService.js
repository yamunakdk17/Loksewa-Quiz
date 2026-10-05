const questionModel = require("../models/questionModel");
const createError = require("../utils/error");

// Create question
const createQuestion = async (questionData) => {
  if (!questionData.question_text) {
    throw createError("Question text is required", 400);
  }

  return await questionModel.createQuestion(questionData);
};

// Get all questions
const getQuestion = async () => {
  const questions = await questionModel.getQuestion();

  if (!questions || questions.length === 0) {
    throw createError("No questions found", 404);
  }

  return questions;
};

module.exports = {
  createQuestion,
  getQuestion,
};
