const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);
app.use("/uploads", express.static("uploads"));
// Health check route
app.get("/", (req, res) => {
  res.send("API is running ");
});

module.exports = app;



