// Database communication

const db = require("../config/db");

// Create question
const createQuestion = async (questionData) => {
  const {
    question_type,
    category,
    difficulty,
    subject,
    province,
    exam_date,
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
            subject,
            province,
            exam_date,
            question_text,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_answer,
            explanation
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const [result] = await db.execute(sql, [
    question_type,
    category,
    difficulty,
    subject,
    province,
    exam_date,
    question_text,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_answer,
    explanation,
  ]);

  return result;
};

// Get all questions
const getQuestion = async () => {
  const sql = `
        SELECT
            id,
            question_type,
            category,
            difficulty,
            subject,
            province,
            exam_date,
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
  getQuestion,
};
