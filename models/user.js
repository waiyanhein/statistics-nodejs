// grab the things we need
//var mongoose = require('mongoose'); //become global
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: { type: String, require: true },
  email : { type: String, required: true },
  password: { type: String, required: true },
});

// the schema is useless so far
// we need to create a model using it
var user = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = user;