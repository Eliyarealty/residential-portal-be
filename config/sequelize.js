const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    dialect: "mysql",
    // port: process.env.DB_PORT || 3306,
    port: process.env.MYSQLPORT,
    logging: false,
  }
);

module.exports = sequelize;
