const noticeService = require("../services/noticeService");
const response = require("../utils/response");

// Get all notices
const getAllNotices = async (req, res) => {
  try {
    const notices = await noticeService.getAllNotices();

    return response.success(res, "Notices fetched successfully", notices);
  } catch (error) {
    console.error("Get all notices error:", error);

    return response.error(
      res,
      error.message || "Failed to get notices",
      error.statusCode || 500,
    );
  }
};

// Get notices by sector
const getNoticesBySector = async (req, res) => {
  try {
    const { sector } = req.params;

    const notices = await noticeService.getNoticesBySector(sector);

    return response.success(
      res,
      `${sector} notices fetched successfully`,
      notices,
    );
  } catch (error) {
    console.error("Get notices by sector error:", error);

    return response.error(
      res,
      error.message || "Failed to get notices",
      error.statusCode || 500,
    );
  }
};

// Get single notice
const getNoticeById = async (req, res) => {
  try {
    const { id } = req.params;

    const notice = await noticeService.getNoticeById(id);

    return response.success(res, "Notice fetched successfully", notice);
  } catch (error) {
    console.error("Get notice error:", error);

    return response.error(
      res,
      error.message || "Failed to get notice",
      error.statusCode || 500,
    );
  }
};

// Create notice
const createNotice = async (req, res) => {
  try {
    const {
      title,
      sector,
      notice_type,
      description,
      organization,
      published_date,
      deadline,
      status,
    } = req.body;

    const notice_pdf = req.file
      ? `/uploads/notices/${req.file.filename}`
      : null;

    const noticeData = {
      title,
      sector,
      notice_type,
      description,
      organization,
      published_date,
      deadline,
      status,
      notice_pdf,
    };

    const result = await noticeService.createNotice(noticeData);

    return response.created(res, "Notice created successfully", {
      noticeId: result.insertId,
    });
  } catch (error) {
    console.error("Create notice error:", error);

    return response.error(
      res,
      error.message || "Failed to create notice",
      error.statusCode || 500,
    );
  }
};

// Update notice
const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      sector,
      notice_type,
      description,
      organization,
      published_date,
      deadline,
      status,
    } = req.body;

    const noticeData = {
      title,
      sector,
      notice_type,
      description,
      organization,
      published_date,
      deadline,
      status,
    };

    // Only add new PDF if uploaded
    if (req.file) {
      noticeData.notice_pdf = `/uploads/notices/${req.file.filename}`;
    }

    const result = await noticeService.updateNotice(id, noticeData);

    return response.success(
      res,
      "Notice updated successfully",
      result
    );
  } catch (error) {
    console.error("Update notice error:", error);

    return response.error(
      res,
      error.message || "Failed to update notice",
      error.statusCode || 500
    );
  }
};

// Delete notice
const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    await noticeService.deleteNotice(id);

    return response.success(res, "Notice deleted successfully");
  } catch (error) {
    console.error("Delete notice error:", error);

    return response.error(
      res,
      error.message || "Failed to delete notice",
      error.statusCode || 500,
    );
  }
};

module.exports = {
  getAllNotices,
  getNoticesBySector,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
};
