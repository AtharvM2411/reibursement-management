const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Company = sequelize.define("Company", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: "INR",
  },
});

module.exports = Company;