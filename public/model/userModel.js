var mongoose = require( 'mongoose' );

//SCHEMA
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
	user_id : ObjectId,
	email : String,
	password : String,
	firstName : String,
	lastName : String,
	dateOfBirth : Date,
	securityQuestion : String,
	securityAnswer : String,
	dateJoined : Date
});

module.exports = mongoose.model('Users', userSchema);