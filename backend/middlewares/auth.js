const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../middlewares/errors/ErrorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler(401, "Not Authorised"));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  next();
});

const authorise = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(403, `Role [${req.user.role}] is not authorised`)
      );
    }

    next();
  };
};

module.exports = { isAuthenticated, authorise };
