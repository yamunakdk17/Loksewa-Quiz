const questionModel = require("../models/questionModel");
const createError = require("../utils/error");

// Create a quiz question, prevent duplicates,
// and limit each category to 15 questions
const createQuestion = async (questionData) => {
  const questionText = questionData.question_text?.trim();
  const category = questionData.category?.trim();

  // Validate question text
  if (!questionText) {
    throw createError("Question text is required", 400);
  }

  // Validate category
  if (!category) {
    throw createError("Category is required", 400);
  }

  // Check for duplicate questions in the same category
  const existingQuestion = await questionModel.findDuplicateQuestion({
    question_text: questionText,
    category,
  });

  if (existingQuestion) {
    throw createError("This question already exists in this category.", 409);
  }

  // Count questions in the selected category
  const totalQuestions = await questionModel.countQuestionsByCategory(category);

  // Maximum 15 questions per category
  if (totalQuestions >= 15) {
    throw createError(
      `The ${category} category already has 15 questions. You cannot add more.`,
      400,
    );
  }

  // Save the question
  return await questionModel.createQuestion({
    question_type: questionData.question_type || "MCQ",
    category,
    difficulty: questionData.difficulty,
    question_text: questionText,
    option_a: questionData.option_a,
    option_b: questionData.option_b,
    option_c: questionData.option_c,
    option_d: questionData.option_d,
    correct_answer: questionData.correct_answer,
    explanation: questionData.explanation || "",
  });
};

// Get all quiz questions
const getQuestion = async () => {
  return await questionModel.getQuestion();
};

module.exports = {
  createQuestion,
  getQuestion,
};
