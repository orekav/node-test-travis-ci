const express = require("express");
const app = express();

app.all("*", (req, res) => res.json({ message: "All is well" }));

module.exports = app;