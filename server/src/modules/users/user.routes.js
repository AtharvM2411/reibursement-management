const express = require("express");
const { getUsers } = require("./user.controller");

const authMiddleware = require("../../middleware/authMiddleware");
const roleMiddleware = require("../../middleware/roleMiddleware");

const router = express.Router();

// Only ADMIN can access this route
router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getUsers
);

module.exports = router;