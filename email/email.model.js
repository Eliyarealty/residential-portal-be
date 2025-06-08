const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

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
    senderImage: {
      type: DataTypes.STRING,
      allowNull: true, // Optional, can be null if no image
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default to unread
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Email;
