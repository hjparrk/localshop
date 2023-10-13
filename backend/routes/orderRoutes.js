const express = require("express");
const { authorise, isAuthenticated } = require("../middlewares/auth");
const {
  getOrders,
  createOrder,
  getOrderDetails,
  updateOrder,
  getMyOrders,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/", isAuthenticated, getMyOrders);
router.get("/all", isAuthenticated, authorise("admin"), getOrders);
router.get("/:id", isAuthenticated, getOrderDetails);
router.post("/", isAuthenticated, createOrder);
router.put("/:id", isAuthenticated, authorise("admin"), updateOrder);

module.exports = router;
