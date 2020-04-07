const { Model, DataTypes } = require("sequelize");
const sequelize = require("./index");

const bcrypt = require("bcrypt");
const saltRounds = 10;

class User extends Model {
	async generateHash(aPassword) { return await bcrypt.hash(aPassword, saltRounds); }
	async validPassword(aPassword) { return await bcrypt.compare(aPassword, this.password); }
}

User.init(
	{
		email: {
			type: DataTypes.STRING,
			validate: { notEmpty: true, isEmail: true },
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			validate: { notEmpty: true },
			allowNull: false,
		},
		customerId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "user",
		timestamps: true,
		paranoid: true,
		hooks: {
			beforeCreate: async (user, options) => {
				user.password = await user.generateHash(user.password);
			},
		},
	}
);

module.exports = User;