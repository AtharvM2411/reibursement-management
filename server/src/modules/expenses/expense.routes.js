const express = require("express");
const {
  createExpense,
  getMyExpenses,
  getAllExpenses
} = require("./expense.controller");
const upload = require("../../utils/upload");
const authMiddleware = require("../../middleware/authMiddleware");
const roleMiddleware = require("../../middleware/roleMiddleware");

const router = express.Router();

// Only EMPLOYEE can create expense
router.post(
  "/",
  authMiddleware,
  upload.single("receipt"),
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

router.get("/all", authMiddleware, admin,roleMiddleware("ADMIN"), getAllExpenses);

module.exports = router;