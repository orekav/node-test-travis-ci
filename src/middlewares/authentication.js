const isAuthenticated = async (req, res, next) => {
	if (req.session.user) {
		next();
	}
	else {
		res
			.status(401)
			.json({ message: "You have to sign in" });
		// next(new Unauthorized("You have to log in"));
	}
};

module.exports = {
	isAuthenticated,
};