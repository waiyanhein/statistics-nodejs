var userRepo = require('../models/user_repo');
var session = require('express-session');
var commonHelper = require('../helpers/common_helper');

exports.register = function(request, response){
	
	//quoteModel.createQuote("Wai Yan Hein", "Wai Yan Quote Ha");
    //response.render('home/index');
    //response.send('Registration Form');
    response.render('account/register');
};

exports.postRegister = function(req, res){
	req.checkBody("name", "Name is required").notEmpty();
	req.checkBody("email", "Email is required").notEmpty();
	req.checkBody("email", "Invalid email format").isEmail();
	req.checkBody("password","Password is required").notEmpty();
	var errors = req.validationErrors();
	if(errors){
		res.json({ status: false, errors: errors });
	}else{
		userRepo.createUser(req, function(err, user){
			if(err){
				res.json({ status : false, error : err });
			}else{
				req.session.user = user;
				res.json({ status : true , user : user });
			}
		});	
	}

};


exports.login = function(req, res){
	res.render('account/login');
};


exports.postLogin = function(req, res){
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Invalid email format').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	var errors = req.validationErrors();
	if(errors){
		res.json({ status : false, errors: errors });
	}else{
		userRepo.findUserByEmail(req.body.email, function(err, user){
			if(err){
				//
				res.json({ status : false, error: err });
			}else{
				if(user){
					if(commonHelper.isValidAccountPassword(req.body.password, user.password)){
						req.session.user = user;
						res.json({ status: true, user: user });
					}else{
						res.json({ status: false, form_error: "Invalid account" });
					}
				}else{
					//unable to find user
					res.json({ status: false, form_error: "Invalid account" });
				}
			}
		});
	}
};

exports.getUserByEmail = function(req ,res){
	userRepo.findUserByEmail("iljimae.ic@gmail.com", function(err, user){
		if(err){
			res.send('Error');
		}else{

			res.json(commonHelper.isValidAccountPassword("april.2241991", user.password));
		}
	});
};

// api starts from here
exports.signIn = function(req, res){
	req.checkBody("email", "Email is required").notEmpty();
	req.checkBody("email", "Invalid email").isEmail();
	req.checkBody("password", "Password is required").notEmpty();
	var errors = req.validationErrors();
	if(errors){
		res.json({ status: false, errors: errors });
	}else{
		userRepo.findUserByEmail(req.body.email, function(err, user){
			if(err){
				res.json({ status: false, error: err });
			}else{
				if(user){
					//user acccount found by email and check for valid password
					if(commonHelper.isValidAccountPassword(req.body.password, user.password)){
						//login the user
						userRepo.logInUser(user.id, function(err, loginSession){
							if(err){
								res.json({ status: false, error: err });
							}else{
								if(loginSession){
									var data = { 
										user_id : user._id, 
										name: user.name,  
										email : user.email,
										token: loginSession.token,
										created_at : loginSession.created_at
									}
									
									res.json({ status: true,  login_session: data });
								}else{
									
									res.json({ status : false, error: "Unable to login" });
								}
							}
						});
					}else{
						res.json({ status: false, errors : [ { msg : "Invalid account" } ] });
					}
					
				}else{
					//user not found
					res.json({ status: false, errors : [ { msg : "Invalid account" } ] });
				}
			}
		});
	}
};

exports.signUp = function(req, res){
	req.checkBody("name", "Name is required").notEmpty();
	req.checkBody("email", "Email is required").notEmpty();
	req.checkBody("email", "Invalid email format").isEmail();
	req.checkBody("password","Password is required").notEmpty();
	var errors = req.validationErrors();
	if(errors){
		res.json({ status: false, errors: errors });
	}else{
		//check email unique
		userRepo.findUserByEmail(req.body.email, function(err, user){
			if(err){
				return res.json({ status : false, error: err });
			}else{
				if(user){
					//email is not unique
					return res.json({ status : false , errors : [ { msg : "Email address has been already taken" } ] });

				}else{
					userRepo.createUser(req, function(err, user){
						if(err){
							res.json({ status : false, error : err });
						}else{
							if(user){
								//login the user as well
								userRepo.logInUser(user._id, function(err, loginSession){
									if(err){
									//
									res.json({ status: false, error: err });
								}else{
									var data = { 
										user_id : user._id, 
										name: user.name,  
										email : user.email,
										token: loginSession.token,
										created_at : loginSession.created_at
									}
									res.json({ status: true, login_session: data });
								}
							});
							}else{
								res.json({ status : false, error: "Unable to create user" });
							}
						}
					});	
				}
			}
		});
		
	}
};