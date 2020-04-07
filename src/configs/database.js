const env = process.env.NODE_ENV || "development";

const config = {
	development: {
		dialect: "sqlite",
		storage: "./database.sqlite3",
		logging: false,
	},
	test: {
		dialect: "sqlite",
		storage: ":memory:",
		logging: false,
	},
	production: {
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_DATABASENAME,
		host: process.env.DATABASE_HOST,
		logging: false,
		pool: {
			max: 50,
			min: 1,
			idle: 30000
		},
		dialectOptions: {
			useUTC: false,
			encrypt: true,
			requestTimeout: 30000
		},
		dialect: "mariadb"
	}
};

module.exports = config[env];