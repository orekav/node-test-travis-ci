const express = require("express");
const app = express();

app.all("*", (req, res) => res.json({ message: "All is well" }));
app.listen(process.env.PORT);

module.exports = app;