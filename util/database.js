const Sequelize = require("sequelize");

const sequelize = new Sequelize("candyshop", "root", "root123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
