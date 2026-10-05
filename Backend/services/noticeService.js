const noticeModel = require("../models/noticeModel");
const createError = require("../utils/error");

// CREATE NOTICE
const createNotice = async (noticeData) => {
  if (!noticeData.title) {
    throw createError("Notice title is required", 400);
  }

  if (!noticeData.description) {
    throw createError("Notice description is required", 400);
  }

  if (!noticeData.sector) {
    throw createError("Notice sector is required", 400);
  }

  const data = {
    title: noticeData.title,
    description: noticeData.description,
    sector: noticeData.sector,
    notice_type: noticeData.notice_type,
    organization: noticeData.organization,
    published_date: noticeData.published_date || null,
    deadline: noticeData.deadline || null ,
    status: noticeData.status,
    notice_pdf: noticeData.notice_pdf,
  };

  return await noticeModel.createNotice(data);
};

// GET ALL NOTICES
const getAllNotices = async () => {
  return await noticeModel.getAllNotices();
};

// GET NOTICES BY SECTOR
const getNoticesBySector = async (sector) => {
  if (!sector) {
    throw createError("Sector is required", 400);
  }

  return await noticeModel.getNoticesBySector(sector);
};

// GET SINGLE NOTICE
const getNoticeById = async (id) => {
  if (!id) {
    throw createError("Notice ID is required", 400);
  }

  const notice = await noticeModel.getNoticeById(id);

  if (!notice) {
    throw createError("Notice not found", 404);
  }

  return notice;
};

// UPDATE NOTICE
const updateNotice = async (id, noticeData) => {
  if (!id) {
    throw createError("Notice ID is required", 400);
  }

  if (!noticeData.title) {
    throw createError("Notice title is required", 400);
  }

  if (!noticeData.description) {
    throw createError("Notice description is required", 400);
  }

  if (!noticeData.sector) {
    throw createError("Notice sector is required", 400);
  }

  const data = {
    title: noticeData.title,
    description: noticeData.description,
    sector: noticeData.sector,
    notice_type: noticeData.notice_type,
    organization: noticeData.organization,
    published_date: noticeData.published_date,
    deadline: noticeData.deadline,
    status: noticeData.status,
    notice_pdf: noticeData.notice_pdf,
  };

  const result = await noticeModel.updateNotice(id, data);

  if (result.affectedRows === 0) {
    throw createError("Notice not found", 404);
  }

  return result;
};

// DELETE NOTICE
const deleteNotice = async (id) => {
  if (!id) {
    throw createError("Notice ID is required", 400);
  }

  const result = await noticeModel.deleteNotice(id);

  if (result.affectedRows === 0) {
    throw createError("Notice not found", 404);
  }

  return result;
};

module.exports = {
  createNotice,
  getAllNotices,
  getNoticesBySector,
  getNoticeById,

  updateNotice,
  deleteNotice,
};
