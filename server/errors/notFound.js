function notFound(res, req, next) {
  next({ status: 404, message: `Path not found: ${req.originalUrl}` });
}

module.exports = notFound;
