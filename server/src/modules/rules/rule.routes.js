const express = require("express");
const { getRules, createRule } = require("./rule.controller");
const { isAdmin } = require("../../middleware/adminMiddleware");
const authMiddleware = require("../../middleware/authMiddleware");
const router = express.Router();

// anyone can view rules
router.get("/", authMiddleware, getRules);

// only admin can create rules
router.post("/", authMiddleware, isAdmin, createRule);

module.exports = router;


