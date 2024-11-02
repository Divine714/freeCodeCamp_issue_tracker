const mongoose = require("mongoose");

const database = mongoose.connect(process.env.database);

module.exports = database