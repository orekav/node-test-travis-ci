const { Model, DataTypes } = require("sequelize");
const sequelize = require("./index");

class Customer extends Model { }
Customer.init(
	{
		firstName: {
			type: DataTypes.STRING,
			validate: { notEmpty: true },
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			validate: { notEmpty: true },
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "customer",
		timestamps: true,
		paranoid: true,
	}
);

module.exports = Customer;