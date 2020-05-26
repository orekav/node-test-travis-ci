const winston = require("winston");
const config = require("../configs/logger");

const logger = winston.createLogger({
	level: 'info',
	transports: [
		new winston.transports.Console({
			handleExceptions: true,
			format: winston.format.cli(),
		}),
	],
	exitOnError: false,
	exceptionHandlers: [
		new winston.transports.Console({ handleExceptions: true }),
	],
});

module.exports = logger;