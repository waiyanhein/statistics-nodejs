var bcrypt = require('bcrypt');

module.exports.hashAccountPassword = function(password){
	salt = bcrypt.genSaltSync();
	return bcrypt.hashSync(password, salt);
}

module.exports.isValidAccountPassword = function(password, db_password){
	return bcrypt.compareSync(password, db_password);
}

module.exports.convertUTCDate = function(dateString){
	return new Date(dateString + "T00:00:00Z");
}