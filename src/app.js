const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const session = require("./middlewares/session");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

app.use(compression());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session);

app.use("/api", router);

app.use(errorHandler);

module.exports = app;