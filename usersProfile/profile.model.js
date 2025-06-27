const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const UserProfile = sequelize.define(
  "UsersProfile",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    mobileNumber: {
      type: DataTypes.STRING,
    },
    landlineNumber: {
      type: DataTypes.STRING,
    },
    whatsappNumber: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.TEXT,
    },
    profilePicture: {
      type: DataTypes.STRING,
    },
    updateInListings: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = UserProfile;
