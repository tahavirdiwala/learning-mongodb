const sendResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({ statusCode, message, ...(data && { data }) });
};

module.exports = sendResponse;
