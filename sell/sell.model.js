const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); // Adjust the path if needed

const SellRequest = sequelize.define("SellRequest", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  propertyAddress: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = SellRequest;
