const express = require("express");
const { authorise, isAuthenticated } = require("../middlewares/auth");
const {
  addToCart,
  checkout,
  clearCart,
  getMyCart,
  updateCart,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/", isAuthenticated, getMyCart);
router.post("/", isAuthenticated, addToCart);
router.put("/", isAuthenticated, updateCart);
router.put("/clear", isAuthenticated, clearCart);
router.get("/checkout", isAuthenticated, checkout);

module.exports = router;
