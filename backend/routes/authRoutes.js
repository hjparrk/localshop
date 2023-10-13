const express = require("express");
const { authorise, isAuthenticated } = require("../middlewares/auth");
const {
  register,
  login,
  logout,
  getProfile,
  getUsers,
  deleteUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", isAuthenticated, getProfile);
router.get("/users", isAuthenticated, authorise("admin"), getUsers);
router.delete("/users/:id", isAuthenticated, authorise("admin"), deleteUser);

module.exports = router;
