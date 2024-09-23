const responser = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({ statusCode, message, ...(data && { data }) });
};

module.exports = responser;
