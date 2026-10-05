const response = {
  success(res, message, data = null, statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  },

  created(res, message, data = null) {
    return this.success(res, message, data, 201);
  },

  error(res, message, statusCode = 500, data = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      data,
    });
  },
};

module.exports = response;
