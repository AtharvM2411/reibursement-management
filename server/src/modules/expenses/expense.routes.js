const express = require("express");
const {
  createExpense,
  getMyExpenses,
} = require("./expense.controller");

const authMiddleware = require("../../middleware/authMiddleware");
const roleMiddleware = require("../../middleware/roleMiddleware");

const router = express.Router();

// Only EMPLOYEE can create expense
router.post(
  "/",
  authMiddleware,
  roleMiddleware("EMPLOYEE"),
  createExpense
);

// Get own expenses
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("EMPLOYEE"),
  getMyExpenses
);

module.exports = router;