var mongoose = require( 'mongoose' );
var mongodb = require( 'mongodb' );
var userModel = require( '../model/userModel.js' );
var nodemailer = require( 'nodemailer' );
var crypto = require( 'crypto' );
var key = 'keyboard cat';
var utilities = require( '../utilities/utilities.js' )


var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",  // sets automatically host, port and connection security settings
   auth: {
       user: "Nuat.golden.leaf@gmail.com",
       pass: "donnyarbiol123"
   }
});

exports.checkUsers = function ( req, res ){
	console.log(req.body);
	userModel.findOne({email : req.body.email},{email : 1}, function ( err, doc){
		if(err){throw err, console.log(err)}
		else{
			res.send(200, doc);
		}
	})
	

}

exports.addUser = function( req, res ){
	var body = req.body;
	var password = utilities.GeneratePassword();
	console.log(body);
	console.log( 'this is password: '+password );
	var pword = crypto.createHash('md5').update(password).digest('hex');
	console.log( 'this is encrypted password: '+pword  );
	new userModel({
		email : body.email,
		password : pword,
		firstName : body.firstName,
		lastName : body.lastName,
		dateOfBirth : body.dateOfBirth,
		securityQuestion : body.securityQuestion,
		securityAnswer : body.securityAnswer,
		dateJoined : new Date()
	}).save(function ( err, doc ){
		if(err){throw err;console.log(err)}
		else{
			console.log('user has been saved');
			console.log(body.email);
			// send an email to the user's email
			smtpTransport.sendMail({  //email options
			   from: "Golden Leaf <Nuat.golden.leaf@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
			   to: body.email, // receiver
			   subject: "Emailing with nodemailer", // subject
			   text: "Dear "+body.firstName+" "+body.lastName+",\nThank you for register to our forums. You can login to our website using the following credentials:\nUsername: "+body.email+"\nPassword :"+password+"\nMay you enjoy using our forums.\n\nSincerly,\nForumApp Admin" // body
			}, function(error, response){  //callback
			   if(error){
			       console.log(error);
			   }else{
			       console.log("Message sent: " + response.message);
			   }
			   smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
			});
			res.send(200, doc)

		}
	})
}

