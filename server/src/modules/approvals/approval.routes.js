const express = require("express");
const {
  getPending,
  approve,
  reject,
} = require("./approval.controller");

const authMiddleware = require("../../middleware/authMiddleware");
const roleMiddleware = require("../../middleware/roleMiddleware");

const router = express.Router();

// manager/admin only
router.get(
  "/pending",
  authMiddleware,
  roleMiddleware("MANAGER", "ADMIN"),
  getPending
);

router.post(
  "/:id/approve",
  authMiddleware,
  roleMiddleware("MANAGER", "ADMIN"),
  approve
);

router.post(
  "/:id/reject",
  authMiddleware,
  roleMiddleware("MANAGER", "ADMIN"),
  reject
);

module.exports = router;
