const express = require("express");
const router = express.Router();

const authController = require("./auth.controller");
const authMiddleware = require("./auth.middleware");

// Auth Routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected Route
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route",
    user: req.user
  });
});

module.exports = router;