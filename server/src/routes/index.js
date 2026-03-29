const express = require("express");
const userRoutes = require("../modules/users/user.routes");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "API working ✅" });
});
router.use("/users", userRoutes);
module.exports = router;


