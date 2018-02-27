
var User = require('./user');
var LoginSession = require('./login_session');
var commonHelper = require('../helpers/common_helper'); //Global variable. Singleton
var randomstring = require("randomstring");

module.exports.createUser = function(data, callback){
	var user = new User({
		name : data.body.name,
		email : data.body.email,
		password : commonHelper.hashAccountPassword(data.body.password)
	}); 
	user.save(function(err, user) {
  		if (err){
  		    callback(err, null);
  		}else{
  			callback(null, user);
  		}
	});
};

module.exports.findUserByEmail = function(email, callback){
	User.find({ email, email }, function(err, users){
		if(err){
			console.log(err);
			callback(err, null);
		}else{
			if(users!=null && users.length>0){
				callback(null, users[0]);
			}else{
				callback(null, null);
			}
		}
	})
};

module.exports.logInUser = function(user_id, callback){
	var token = randomstring.generate();
	var loginSession = new LoginSession({
		token : token,
		created_at : new Date(),
		user : user_id
	});
	loginSession.save(function(err, loginSession){
		if(err){
			callback(err, null);
		}else{
			callback(null, loginSession);
		}
	});
};

module.exports.findAuthUser = function(token, user_id, callback){
	LoginSession.findOne({ token : token, user : user_id }).populate('user').exec(function(err, result){
		if(err){
			callback(err, null);
		}else{
			callback(null, result);
		}
	});
};