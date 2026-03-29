require("dotenv").config();

const express = require("express");
const sequelize = require("./config/db");
const authRoutes = require("./modules/auth/auth.routes");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

sequelize.sync().then(() => {
  console.log("Database Synced");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

require("./modules/reimbursement/reimbursement.model");