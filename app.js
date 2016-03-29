/*
 * Module dependencies
 */
var express = require("express"),
    lessMiddleware = require("less-middleware"),
    nodemailer = require('nodemailer');

var app = express();
app.use(lessMiddleware(__dirname + "/less",{
	dest: __dirname + "/public",
    debug: true,
	force: true
}));
app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use(express.logger("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.bodyParser());
require("./routes")(app, express, nodemailer);

app.listen(8080);
