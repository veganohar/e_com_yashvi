const mongoose = require('mongoose');

var db ={};
db.mongoose = mongoose;
db.product = require("./products.model");
db.user = require("./user.model");
db.cart = require("./cart.model"),
db.order = require("./orders.model");

module.exports = db;