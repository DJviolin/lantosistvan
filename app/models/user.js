// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
const userSchema = new Schema({
  name: String,
  password: String,
  admin: Boolean,
});

module.exports = mongoose.model('User', userSchema);
