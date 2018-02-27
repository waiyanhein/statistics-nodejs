var Income = require('./income');
var Outcome = require('./outcome');
var commonHelper = require('../helpers/common_helper');
var moment = require('moment');

module.exports.saveOutcome = function(data, callback){
	if(data.date==null || data.date==undefined){
		data.date = Date.now();
	}else{
		//yyyy-mm-dd h:i:s ISO format
		data.date = commonHelper.convertUTCDate(data.date);
	}
	var spendings = new Array();
	if(data.spending_amounts.length>0){
		for(var i=0; i<data.spending_amounts.length; i++){
			var spending = {
				name: data.spending_names[i],
				amount : data.spending_amounts[i]
			};
			spendings.push(spending);
		}
	}
	var outcome= new Outcome({
		title : data.title,
		date: data.date,
		user_id : data.user_id,
		spendings : spendings
	});

	outcome.save(function(err, outcome){
		if(err){
			callback(err, null);
		}else{
			callback(null, Outcome);
		}
	});
};


module.exports.getUserOutcomes = function(dateString, user_id, page, record_per_page, callback){
	//var date = commonHelper.convertUTCDate(dateString); - this will not work when hours minutes and seconds are saved
	//{"created_on": {"$gte": new Date(2012, 7, 14), "$lt": new Date(2012, 7, 15)}})
	//https://stackoverflow.com/questions/11973304/mongodb-mongoose-querying-at-a-specific-date
	var today = moment(dateString);
	//var today = moment().startOf('day')
	var tomorrow = moment(today).add(1, 'days')
	//$gte: today.toDate(),
    //$lt: tomorrow.toDate()
    //var offset = (page>1)?(page-1) * record_per_page : 0;
    //Outcome.find({ date : { $gte : today.toDate() , $lt : tomorrow.toDate() } }).skip(offset).limit(record_per_page)
    //{ date: { $gte : today.toDate() , $lt : tomorrow.toDate() }, user_id: user_id }
    if(parseInt(page)<1){
    	page = 1;
    }
    Outcome.paginate({}, { page : parseInt(page), limit: parseInt(record_per_page) }, function(err, result){
    	if(err){
    		callback(err, null);
    	}else{
    		callback(null, result);
    	}
    });
}

module.exports.getUserIncomes = function(user_id, dateString, user_id, page, record_per_page, callback){

}

module.exports.saveIncome = function(data, callback){
	var income = new Income({
		title : data.title,
		date : (data.date==null || data.date==undefined)? Date.now(): commonHelper.convertUTCDate(data.date),
		amount : data.amount,
		user_id : data.user_id
	});
	income.save(function(err, income){
		if(err){
			callback(err, null);
		}else{
			callback(null, income);
		}
	});
}

module.exports.findOutcome = function(id, callback){
	Outcome.find({ _id : id }, function(err, outcomes){
		if(err){
			callback(err, null);
		}else{
			if(outcomes && outcomes.length>0){
				callback(null, outcomes[0]);
			}else{
				callback("Invalid outcome",null);
			}
		}
	});
}