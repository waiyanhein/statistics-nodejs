var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var outcomeSchema = new Schema({
	title : { type: String , require: true },
	date : { type: Date, require: true },
	user_id : {  type: Schema.Types.ObjectId, ref : "User" },
	spendings : [
		{
			name: String,
			amount : Number
		}
	] 
});

outcomeSchema.plugin(mongoosePaginate);

var outcome = mongoose.model('Outcome', outcomeSchema);

module.exports = outcome;