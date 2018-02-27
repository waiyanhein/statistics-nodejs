var statisticsRepo = require('../models/statistics_repo');
var userRepo = require('../models/user_repo');
var Income = require('../models/income');
var Outcome = require('../models/outcome');
var config = require('../config');


module.exports.testing = function(req, res){
	res.send('this is testing. Hun!')
};


module.exports.saveOutcome = function(req, res){
	
	req.checkBody("title", "Title is required").notEmpty();
	var errors = req.validationErrors();
	if(errors){
		res.json({ status : false, errors: errors });
	}else{
		userRepo.findAuthUser(config.authToken, config.authUserId , function(err, result){
			if(err){
				res.json({ status : false , error: err });
			}else{
				var data = {
					title: req.body.title,
					date: req.body.date,
					user_id : result.user._id,
					spending_names : req.body.spending_names,
					spending_amounts : req.body.spending_amounts
					
				};
				statisticsRepo.saveOutcome(data, function(err, outcome){
					if(err){
						res.json({ status : false, error : err });
					}else{
						if(outcome){
							res.json({ status: true, outcome: outcome });
						}else{
							res.json({ status: false, error : "Unable to save income" });
						}
					}
				});
			}
		});

		
	}
};

module.exports.saveIncome = function(req, res){
	userRepo.findAuthUser(config.authToken, config.authUserId, function(err, result){
		if(err){
			res.status(500).json({ error : err });
		}else{
			res.json({ status : true, income, result });
		}
	});
};

module.exports.getUserOutcomes = function(req, res){

	userRepo.findAuthUser(config.authToken, config.authUserId, function(err, result){
		if(err){
			res.status(500).json({ error : err });
		}else{
			if(result){
				statisticsRepo.getUserOutcomes(req.query.date, config.authUserId, req.query.page, req.query.recordPerPage, function(err, result){
					if(err){
						res.status(500).json({ error : err });
					}else{
						res.json(result);
					}
				});	
			}else{
				res.status(401).json({ error : "Unauthorized access" });
			}
		}
	});

};	


module.exports.getOutcome = function(req, res){
	userRepo.findAuthUser(config.authToken, config.authUserId, function(err, result){
		if(err){
			res.status(500).json({ error: err });
		}else{
			if(result){
				statisticsRepo.findOutcome(req.params.id, function(err, outcome){
					if(err){
							res.status(500).json({ error: err });
					}else{
						if(outcome){
							if(outcome.user_id== config.authUserId){
								res.json({ status: true , outcome: outcome });
							}else{
								res.status(401).json({ error : "You are not allowed to access this page" });
							}
						}else{
							res.status(404).json({ error: "Invalid id supplied" });
						}
					}
				});
			}else{
				res.status(401).json({ error : "Unauthorized access" });
			}
		}
	});
}