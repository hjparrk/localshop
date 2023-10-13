const express = require("express");
const { authorise, isAuthenticated } = require("../middlewares/auth");
const {
  getProducts,
  getProductDetails,
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} = require("../controllers/productController");
const upload = require("../services/multer");

const router = express.Router();

// GET /api/products
router.get("/", getProducts);
router.get("/all", isAuthenticated, authorise("admin"), getAllProducts);
// GET /api/products/:id
router.get("/:id", getProductDetails);

// POST /api/products
router.post(
  "/",
  isAuthenticated,
  authorise("admin"),
  upload.single("image"),
  createProduct
);

// PUT /api/products/:id
router.put("/:id", isAuthenticated, authorise("admin"), updateProduct);

// DELETE /api/products/:id
router.delete("/:id", isAuthenticated, authorise("admin"), deleteProduct);

module.exports = router;
