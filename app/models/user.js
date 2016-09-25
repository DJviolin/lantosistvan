// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
  userid: ObjectId,
  name: String,
  password: String,
  admin: Boolean,
}));
