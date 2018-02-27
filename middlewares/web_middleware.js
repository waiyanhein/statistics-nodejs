var config = require('../config');

module.exports.check_login_session = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/account/login');
    }    
};

module.exports.retrieve_auth_token = (req, res, next) => {

	if(req.body.authToken){
		config.authToken = req.body.authToken;
	}else if(req.headers['auth_token']){
		config.authToken  = req.headers['auth_token'];
	}else if(req.query.authToken){
		config.authToken = req.query.authToken;
	}else if(req.body.authToken){
		config.authToken = req.body.authToken;
	}

	if(req.body.authUserId){
		config.authUserId = req.body.authUserId;
	}else if(req.headers['auth_user_id']){
		config.authUserId = req.headers['auth_user_id'];
	}else if(req.query.authUserId){
		config.authUserId = req.query.authUserId;
	}else if(req.body.authUserId){
		config.authUserId = req.body.authUserId;
	}

	next();
};