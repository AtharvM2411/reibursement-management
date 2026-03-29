const express = require("express");
const {
  getPending,
  approve,
  reject,
} = require("./approval.controller");

const authMiddleware = require("../../middleware/authMiddleware");
const roleMiddleware = require("../../middleware/roleMiddleware");

const router = express.Router();

// Manager/Admin → view pending approvals
router.get(
  "/pending",
  authMiddleware,
  roleMiddleware("MANAGER", "ADMIN"),
  getPending
);

// Approve
router.post(
  "/:id/approve",
  authMiddleware,
  roleMiddleware("MANAGER", "ADMIN"),
  approve
);

// Reject
router.post(
  "/:id/reject",
  authMiddleware,
  roleMiddleware("MANAGER", "ADMIN"),
  reject
);

module.exports = router;