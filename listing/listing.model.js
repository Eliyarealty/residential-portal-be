const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); // adjust the path if needed

const Listing = sequelize.define("Listing", {
  activeListing: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  forSale: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  forRent: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  superHot: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  hot: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Listing;
