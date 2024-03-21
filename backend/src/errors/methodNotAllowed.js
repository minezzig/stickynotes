function methodNotAllowed(req, res, next) {
    next({ status: 405, message: `not allowed: ${req.originalUrl}` });
}

export default methodNotAllowed;