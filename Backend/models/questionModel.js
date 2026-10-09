const db = require("../config/db");

// Check for duplicate questions in the same category
const findDuplicateQuestion = async ({ question_text, category }) => {
  const sql = `
    SELECT id
    FROM questions
    WHERE LOWER(TRIM(question_text)) = LOWER(TRIM(?))
      AND LOWER(TRIM(category)) = LOWER(TRIM(?))
    LIMIT 1
  `;

  const [rows] = await db.execute(sql, [question_text, category]);

  return rows[0] || null;
};

// Count questions in the same category
const countQuestionsByCategory = async (category) => {
  const sql = `
    SELECT COUNT(*) AS total
    FROM questions
    WHERE LOWER(TRIM(category)) = LOWER(TRIM(?))
  `;

  const [rows] = await db.execute(sql, [category]);

  return Number(rows[0].total);
};

// Create a quiz question
const createQuestion = async (questionData) => {
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
  } = questionData;

  const sql = `
    INSERT INTO questions (
      question_type,
      category,
      difficulty,
      question_text,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_answer,
      explanation
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.execute(sql, [
    question_type || "MCQ",
    category || null,
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

// Get all quiz questions
const getQuestion = async () => {
  const sql = `
    SELECT
      id,
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
      created_at
    FROM questions
    ORDER BY id DESC
  `;

  const [rows] = await db.execute(sql);

  return rows;
};

module.exports = {
  createQuestion,
  findDuplicateQuestion,
  getQuestion,
  countQuestionsByCategory,
};
