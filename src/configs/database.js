const env = process.env.NODE_ENV || "development";

const databaseConnection = {
	dialect: process.env.DATABASE_DIALECT,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	database: process.env.DATABASE_DATABASENAME,
};

const sslConfig = () => {
	if (process.env.DATABASE_USE_SSL !== "false")
		return { required: true, rejectUnauthorized: false };
	else
		return null;
};

const poolConfig = {
	max: 10,
	min: 1,
	idle: 30000
};

const dialectOptions = {
	useUTC: false,
	encrypt: true,
	requestTimeout: 30000,
	ssl: sslConfig(),
};

const config = {
	...databaseConnection,
	pool: poolConfig,
	dialectOptions: dialectOptions,
	timezone: "GMT",
	logging: false,
};

const options = {
	test: {
		dialect: "sqlite",
		storage: ":memory:",
		logging: false,
	},
	development: {
		...config,
	},
	production: {
		...config,
	}
};

if (process.env.DATABASE_URL)
	module.exports = [
		process.env.DATABASE_URL,
		options[env],
	];
else
	module.exports = [options[env]];