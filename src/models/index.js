const { Sequelize } = require("sequelize");
const config = require("../configs/database");
const sequelize = new Sequelize(...config);

module.exports = sequelize;

const User = require("./user");
const Customer = require("./customer");

User.belongsTo(Customer);
Customer.hasOne(User);