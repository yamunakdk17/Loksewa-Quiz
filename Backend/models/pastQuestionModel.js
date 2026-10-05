const db = require("../config/db");

const createPastQuestion = async ({
  fileName,
  originalName,
  filePath,
  fileType,
}) => {
  const [result] = await db.execute(
    `INSERT INTO past_questions
      (file_name, original_name, file_path, file_type)
     VALUES (?, ?, ?, ?)`,
    [fileName, originalName, filePath, fileType],
  );

  return {
    id: result.insertId,
    fileName,
    originalName,
    filePath,
    fileType,
  };
};

module.exports = {
  createPastQuestion,
};
