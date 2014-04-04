var mongoose = require( 'mongoose' );

//SCHEMA
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
	user_id : ObjectId,
	email : String,
	sesion_id :
});

module.exports = mongoose.model('Users', userSchema);