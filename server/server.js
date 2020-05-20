const express = require("express"),
  app = express(),
  bodyParser = require("body-parser");
var cors = require("cors");

app.use(cors());
port = process.env.PORT || 3000;

const mysql = require("mysql");
// conncection configurations
const mc = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Bigvic5326!",
  database: "ordersystem",
});

mc.connect();

app.listen(port);

console.log("API server started on: " + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require("./app/routes/approutes"); //importing route
routes(app);
