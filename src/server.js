if (process.env.NODE_ENV !== "production") require("dotenv").config();
const logger = require("./services/logger");
const app = require("./app") 
const port = process.env.PORT || 80;
        
require("./models")
    .sync({force: false, logging: (msg) => logger.info(msg) })
    .then(() => {
        app
            .listen(port, () => logger.info(`Server listening at port ${port}`));
    })
    .catch(error => logger.error(error.message));