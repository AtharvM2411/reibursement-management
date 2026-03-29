const express = require("express");
const { getUsers } = require("./user.controller");

const { deleteUser } = require("./user.controller");
const  authMiddleware  = require("../../middleware/authMiddleware");
const { isAdmin } = require("../../middleware/adminMiddleware");

const roleMiddleware = require("../../middleware/roleMiddleware");

const router = express.Router();

// Only ADMIN can access this route
router.delete("/:id", authMiddleware, isAdmin, deleteUser);
router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getUsers
);

module.exports = router;