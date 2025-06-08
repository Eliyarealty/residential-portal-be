const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    dialect: "mysql",
    port: process.env.MYSQLPORT,
    dialectOptions: {
      connectTimeout: 10000, // 10 seconds
    },
    logging: false,
  }
);

module.exports = sequelize;
