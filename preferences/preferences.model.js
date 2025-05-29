const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Preferences = sequelize.define("Preferences", {
  emailNotification: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  newsletter: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  automatedReports: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  area: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Preferences;
