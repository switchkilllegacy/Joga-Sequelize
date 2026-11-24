class ErrorHandler {
  handleError = (error, req, res, next) => {
    if (res.headersSent) {
      return next(error);
    }

    const statusCode = error.statusCode || error.status || 500;
    const message =
      statusCode >= 500
        ? 'Internal server error'
        : error.message || 'Request failed';

    res.status(statusCode).json({ error: message });
  };
}

module.exports = ErrorHandler;
