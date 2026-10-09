const pastQuestionModel = require("../models/pastQuestionModel");

// Upload past-question file
const uploadPastQuestion = async (data) => {
  return await pastQuestionModel.createPastQuestion(data);
};

module.exports = {
  uploadPastQuestion,
};
