const questionModel = require("../models/questionModel");

// Create question
const createQuestion = async (questionData) => {
  return await questionModel.createQuestion(questionData);
};

// Get all questions
const getQuestion = async () => {
  return await questionModel.getQuestion();
};

module.exports = {
  createQuestion,
  getQuestion,
};
