const questionService = require("../services/questionService");
const response = require("../utils/response");

// Create quiz question
const createQuestion = async (req, res) => {
  try {
    const {
      question_type,
      category,
      difficulty,
      question_text,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_answer,
      explanation,
    } = req.body;

    const cleanedCategory = typeof category === "string" ? category.trim() : category;
    const cleanedDifficulty = typeof difficulty === "string" ? difficulty.trim() : difficulty;
    const cleanedQuestionText = typeof question_text === "string" ? question_text.trim() : question_text;
    const cleanedOptions = {
      option_a: typeof option_a === "string" ? option_a.trim() : option_a,
      option_b: typeof option_b === "string" ? option_b.trim() : option_b,
      option_c: typeof option_c === "string" ? option_c.trim() : option_c,
      option_d: typeof option_d === "string" ? option_d.trim() : option_d,
    };
    const cleanedCorrectAnswer =
      typeof correct_answer === "string" ? correct_answer.trim().toUpperCase() : correct_answer;

    // Validate required fields
    if (!cleanedCategory || !cleanedQuestionText) {
      return response.error(
        res,
        "Category and question text are required",
        400,
      );
    }

    if (
      !cleanedDifficulty ||
      !cleanedOptions.option_a ||
      !cleanedOptions.option_b ||
      !cleanedOptions.option_c ||
      !cleanedOptions.option_d ||
      !cleanedCorrectAnswer
    ) {
      return response.error(
        res,
        "Difficulty, all options, and correct answer are required",
        400,
      );
    }

    const questionData = {
      question_type: question_type || "MCQ",
      category: cleanedCategory,
      difficulty: cleanedDifficulty,
      question_text: cleanedQuestionText,
      option_a: cleanedOptions.option_a,
      option_b: cleanedOptions.option_b,
      option_c: cleanedOptions.option_c,
      option_d: cleanedOptions.option_d,
      correct_answer: cleanedCorrectAnswer,
      explanation: explanation ? String(explanation).trim() : "",
    };

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

// Get quiz questions
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
