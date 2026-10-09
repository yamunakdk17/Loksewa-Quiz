const db = require("../config/db");

// Create a past exam question
const createPastQuestion = async (questionData) => {
  const {
    subject,
    difficulty,
    question_text,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_answer,
    explanation,
  } = questionData;

  const sql = `
    INSERT INTO past_questions (
      subject,
      difficulty,
      question_text,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_answer,
      explanation
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.execute(sql, [
    subject,
    difficulty,
    question_text.trim(),
    option_a,
    option_b,
    option_c,
    option_d,
    correct_answer,
    explanation || "",
  ]);

  return result;
};

module.exports = {
  createPastQuestion,
};
