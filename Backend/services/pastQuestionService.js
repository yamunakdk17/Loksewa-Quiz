const pastQuestionModel = require("../models/pastQuestionModel");

const uploadPastQuestion = async (data) => {
  return await pastQuestionModel.createPastQuestion(data);
};

module.exports = {
  uploadPastQuestion,
};
