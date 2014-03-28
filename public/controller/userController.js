var mongoose = require( 'mongoose' );
var mongodb = require( 'mongodb' );
var userModel = require( '../model/userModel.js' );

exports.getAllUsers = function( req, res ){
	var docs = {
		name : 'Daniel',
		occupation : 'tig'
	}
	console.log(req.body);
	res.send(200, docs);
}

exports.addUser = function( req, res ){
	var body = req.body;
	new userModel({
		email : body.email,
		password : body.password,
		firstName : body.firstName,
		lastName : body.lastName,
		dateOfBirth : body.dateOfBirth,
		securityQuestion : body.securityQuestion,
		securityAnswer : body.securityAnswer,
		dateJoined : new Date()
	}).save(function ( err, doc ){
		if(err){throw err;console.log(err)}
		else{console.log('user has been saved'); res.send(200, doc)}
	})
}

