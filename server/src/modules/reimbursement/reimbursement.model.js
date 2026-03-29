const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Reimbursement = sequelize.define("Reimbursement", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "PENDING",
  },

  userId: {
    type: DataTypes.UUID,
  },

  companyId: {
    type: DataTypes.UUID,
  },
});

module.exports = Reimbursement;