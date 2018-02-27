// grab the things we need
//var mongoose = require('mongoose'); //become global
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var user = require('./user');

// create a schema
var loginSessionSchema = new Schema({
  token: { type: String, require: true },
  created_at : { type: Date, default: Date.now,  required: true },
  user: { type: Schema.Types.ObjectId, ref : 'User' },
});

// the schema is useless so far
// we need to create a model using it
var loginSession = mongoose.model('LoginSession', loginSessionSchema);

// make this available to our users in our Node applications
module.exports = loginSession;