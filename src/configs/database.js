const env = process.env.NODE_ENV || "development";

const options = {
	test: {
		dialect: "sqlite",
		storage: ":memory:",
		logging: false,
	},
	development: {
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_DATABASENAME,
		host: process.env.DATABASE_HOST,
		dialect: process.env.DATABASE_DIALECT,
		logging: false,
		pool: {
			max: 10,
			min: 1,
			idle: 30000
		},
		dialectOptions: {
			useUTC: false,
			encrypt: true,
			requestTimeout: 30000,
			ssl: {
				required: true,
				rejectUnauthorized: false,
			},
		},
		timezone: "GMT",
	},
	production: {
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_DATABASENAME,
		host: process.env.DATABASE_HOST,
		dialect: process.env.DATABASE_DIALECT,
		logging: false,
		pool: {
			max: 10,
			min: 1,
			idle: 30000
		},
		dialectOptions: {
			useUTC: false,
			encrypt: true,
			requestTimeout: 30000,
			ssl: {
				required: true,
				rejectUnauthorized: false,
			},
		},
		timezone: "GMT",
	}
};

if (process.env.DATABASE_URL)
	module.exports = [
		process.env.DATABASE_URL,
		options[env],
	];
else
	module.exports = [options[env]];