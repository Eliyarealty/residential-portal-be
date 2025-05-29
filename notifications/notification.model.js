// models/notification.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    senderEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notificationMessage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default to unread
      allowNull: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = Notification;
