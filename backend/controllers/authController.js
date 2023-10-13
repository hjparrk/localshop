const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../middlewares/errors/ErrorHandler");
const User = require("../models/user");
const Cart = require("../models/cart");

// Register user => POST /api/register
const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  await Cart.create({
    user: user._id,
  });

  res.status(201).json({ success: true, message: "registered" });
});

// Login user => POST /api/login
const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler(400, "Please enter email & password"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler(401, "Invalid email or password"));
  }

  const isPasswordVerified = await user.verifyPassword(password);

  if (!isPasswordVerified) {
    return next(new ErrorHandler(401, "Invalid email or password"));
  }

  // generate token
  const token = user.getJWT();

  // configure cookie options
  // 1 day = 1000(ms) * 60(sec) * 60(min) * 24(hr)
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res
    .status(200)
    .cookie("token", token, options)
    .json({ success: true, message: "logged in" });
});

// Logout user => GET /api/logout
const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({ success: true, message: "logged out" });
});

const getProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req?.user?._id);

  res.status(200).json({ user });
});

const getUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({ role: { $ne: "admin" } });

  res.status(200).json({ users });
});

const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  res.status(200).json({ user });
});

module.exports = { register, login, logout, getProfile, getUsers, deleteUser };
