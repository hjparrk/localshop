const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../middlewares/errors/ErrorHandler");
const Cart = require("../models/cart");
const Order = require("../models/order");
const productCalculator = require("../utils/productCalculator");

// Get all history => GET /api/orders/all
const getOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({});

  res.status(200).json({ orders });
});

// Get my order history => GET /api/orders
const getMyOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user._id,
  });

  res.status(200).json({ orders });
});

// Get order details => GET /api/orders
const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById({
    _id: req.params.id,
    user: req.user._id,
  }).populate("products.product");

  res.status(200).json({ order });
});

// Create order => POST /api/orders
const createOrder = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.findOne({
    user: req.user._id,
  });

  if (!cart) {
    return next(new ErrorHandler(404, "No Cart Found"));
  }

  const populatedCart = await Cart.findOne({
    user: req.user._id,
  }).populate("products.product");

  const { total_quantity, total_price } = productCalculator(
    populatedCart.products
  );

  const products = cart.products.map((product) => ({
    product: product.product,
    quantity: product.quantity,
  }));

  const orderData = {
    products,
    total_quantity,
    total_price,
    user: req.user._id,
  };

  const order = await Order.create(orderData);

  res.status(201).json({ success: true, message: "order created" });
});

const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(404, "Order Not Found"));
  }

  await Order.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    {
      status,
    },
    { runValidators: true }
  );

  res.status(200).json({ success: true, messgae: "status updated" });
});

module.exports = {
  getOrders,
  getMyOrders,
  getOrderDetails,
  createOrder,
  updateOrder,
};
