const sequelize = require("../models");
const User = require("../models/user");
const Customer = require("../models/customer");

const signUp = async (req, res, next) => {
	const { firstName, lastName, email, password } = req.body;
	try {
		const customer = await sequelize.transaction(async (transaction) => {
			const newCustomer = await Customer.create(
				{
					firstName,
					lastName,
					user: {
						email,
						password,
					},
				},
				{
					include: [User],
					transaction: transaction,
				}
			);
			// await _sendMailWithReservationState(newCustomer);
			return newCustomer;
		});
		res
			.status(201)
			.json(customer);
	}
	catch (error) {
		next(error);
	}

};

const signIn = async (req, res, next) => {
	const { email, password } = req.body;
	const anUser = await User.findOne(
		{
			where: { email: email },
			include: [
				{
					model: Customer,
				},
			],
		});
	if (anUser && await anUser.validPassword(password)) {
		req.session.user = anUser;
		res.json({ message: "valid", user: anUser });
	}
	else {
		res.json({ message: "Invalid username or password" });
	}
};


const signOff = async (req, res, next) => {
	await req.session.destroy();
	res.redirect("/");
};

const forgotPassword = (req, res, next) => {
	res.send(req.path);
};

const find = async (req, res, next) => {
	const users = await User.findAll({});
	res.json(users);
};

module.exports = {
	signUp,
	signIn,
	signOff,
	forgotPassword,
	find,
};