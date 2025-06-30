const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("../users/users.model");

const Property = sequelize.define(
  "userProperty",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    purpose: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    propertyType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    area: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    installmentAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    readyForPossession: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    adTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    bedrooms: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bathrooms: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    propertyImages: {
      type: DataTypes.JSON, // Store array of image paths
      allowNull: true,
    },
    profileImage: {
      type: DataTypes.STRING, // Store single image path
      allowNull: true,
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

Property.belongsTo(User, { foreignKey: "userId" });

module.exports = Property;
