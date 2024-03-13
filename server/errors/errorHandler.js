function errorHandler(error, res) {
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message });
  }
  
  module.exports = errorHandler;
  