const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); // Adjust the path if needed

const Buy = sequelize.define("Buy", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  propertyType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Buy;
