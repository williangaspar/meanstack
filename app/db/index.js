const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = require("./db")(mongoose);
const Delivery = require("./models/delivery");

db.connect();

module.exports = { db, Delivery };