const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(require("../configs/database"));

module.exports = sequelize;

const User = require("./user");
const Customer = require("./customer");

User.belongsTo(Customer);
Customer.hasOne(User);