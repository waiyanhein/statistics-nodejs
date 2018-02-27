var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var incomeSchema = new Schema({
	title : { type: String , require: true },
	date : { type: Date, require: true },
	amount : { type: Number, require : true },
	user_id : {  type: Schema.Types.ObjectId, ref : "User" }
});
incomeSchema.plugin(mongoosePaginate);

var income = mongoose.model('Income', incomeSchema);

module.exports = income;