function methodNotAllowed() {
    next({ status: 404, message: `not allowed: ${req.originalUrl}` });
}

module.exports = methodNotAllowed;