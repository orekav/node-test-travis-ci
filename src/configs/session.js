module.exports = {
	name: process.env.COOKIE_SESSION_NAME || "COOKIE_SESSION_NAME",
	secret: process.env.COOKIE_SESSION_SECRET || "COOKIE_SESSION_SECRET",
	cookie: {
		maxAge: 1 * 24 * 60 * 60 * 1000,
	},
	store: myStore,
	// Boilerplate options, see:
	// * https://www.npmjs.com/package/express-session#resave
	// * https://www.npmjs.com/package/express-session#saveuninitialized
	rolling: true,
	resave: true,
	saveUninitialized: true
}