const ErrorHandler = require("./ErrorHandler");

const errors = (err, req, res, next) => {
  let error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || "Internal Server Error",
  };

  // Handle Invalid Mongoose ID Error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err?.path}`;
    error = new ErrorHandler(404, message);
  }

  // Handle Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorHandler(400, message);
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const message = `${Object.keys(err.keyValue)} already exists`;
    error = new ErrorHandler(400, message);
  }

  // Handle JsonWebToken Error
  if (err.code === "JsonWebTokenError") {
    const message = `Invalid JSON Web Token`;
    error = new ErrorHandler(400, message);
  }

  // Handle JsonWebToken Error
  if (err.code === "TokenExpiredError") {
    const message = `Expired JSON Web Token`;
    error = new ErrorHandler(400, message);
  }

  res
    .status(error.statusCode)
    .json({ message: error.message, error: err, stack: err?.stack });
};

module.exports = errors;
