const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("../user/user.model");

const Email = sequelize.define(
  "Email",
  {
    senderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senderEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senderPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Email;
