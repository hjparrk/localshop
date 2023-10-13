const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../middlewares/errors/ErrorHandler");
const Product = require("../models/product");
const Filters = require("../utils/Filters");
const { deleteImage } = require("../services/cloudinary");

// Get all products => GET /api/products
const getProducts = catchAsyncErrors(async (req, res, next) => {
  const apiFilters = await new Filters(Product, req.query).search(8);

  const products = apiFilters.query;
  const numOfProducts = apiFilters.filteredQueryNum;
  const itemsPerPage = products.length;

  res.status(200).json({ numOfProducts, itemsPerPage, products });
});

const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find({});

  res.status(200).json({ products });
});

// Get single product details => GET /api/products/:id
const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }

  res.status(200).json({ product });
});

// Create product => POST /api/products
const createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.price = +req.body.price;
  req.body.stock = +req.body.stock;
  req.body.user = req.user._id;

  req.body.image = {
    public_id: req.file.filename,
    url: req.file.path,
  };

  await Product.create(req.body);

  res.status(201).json({ success: true, message: "product created" });
});

// Update product => PUT /api/products/:id
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(404, "Product Not Found"));
  }

  const body = {
    name: req.body.name,
    description: req.body.description,
    brand: req.body.brand,
    category: req.body.category,
    price: +req.body.price,
    stock: +req.body.stock,
  };

  console.log(product);
  console.log(body);

  await Product.findByIdAndUpdate(req.params.id, body);

  res.status(201).json({ success: true, message: "product updated" });
});

// Delete product => DELETE /api/products/:id
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(404, "Product Not Found"));
  }

  const isDeleted = await deleteImage(product.image.public_id);

  if (!isDeleted) {
    return next(new ErrorHandler(400, "Product Image Not Deleted"));
  }

  await product.deleteOne();

  res.status(200).json({ success: true, message: "product deleted" });
});

module.exports = {
  getProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
