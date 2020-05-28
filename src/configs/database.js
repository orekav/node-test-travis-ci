const env = process.env.NODE_ENV || "development";

const databaseURL = process.env.DATABASE_URL;
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
	useUTC: true,
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
		...config,
		dialect: config.dialect || databaseURL ? config.dialect : "sqlite",
		timezone: config.dialect || databaseURL ? config.timezone : "+00:00",
		// storage: config.storage || ":memory:",
	},
	development: {
		...config,
	},
	production: {
		...config,
	}
};

if (databaseURL)
	module.exports = [
		databaseURL,
		options[env],
	];
else
	module.exports = [options[env]];