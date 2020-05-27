const request = require("got");

const validateCaptcha = async (req, res, next) => {
	if (process.env.NODE_ENV !== "production") return next();

	const captcha = req.body["g-recaptcha-response"] || req.body.g_recaptcha_response;

	// g-recaptcha-response is the key that browser will generate upon form submit.
	// if its blank or null means user has not selected the captcha, so return the error.
	if (captcha === undefined || captcha === "" || captcha === null)
		return res
			.status(400)
			.json({ message: "Please, verify that you are not a robot" });

	// Put your secret key here.
	const secretKey = process.env.GOOGLE_CAPTCHA_API_SECRET_KEY;

	// req.connection.remoteAddress will provide IP address of connected user.
	const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;

	try {

		// Hitting GET request to the URL, Google will respond with success or error scenario.
		const { body } = await request.post(verificationUrl, { responseType: "json" });

		// Success will be true or false depending upon captcha validation.
		if (body.success !== undefined && !body.success)
			return res
				.status(400)
				.json({ message: "Captcha validation error" });
	} catch (error) {
		return res
			.status(503)
			.json({ message: "Couldn't validate captcha" });
	}

	next();
};

module.exports = {
	validateCaptcha,
};