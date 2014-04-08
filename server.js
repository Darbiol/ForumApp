var express = require( 'express' ),
app = express(),
http = require( 'http' ),
server = http.createServer( app ),
port = 3020,
path = require( 'path' ),
cwd = process.cwd(),
files = path.join( cwd ),
passport = require( 'passport' ),
LocalStrategy = require( 'passport-local' ).Strategy,
crypto = require( 'crypto' ),
mongoose = require( 'mongoose' ),
userModel = require( './public/model/userModel.js' ),
userApi = require( './public/controller/userController.js' ),
utilities = require( './public/utilities/utilities.js' );

mongoose.connect('mongodb://root:root@ds035907.mongolab.com:35907/felineforum', function (err){
	if(err) {console.log(err);}
	else{console.log('connected to database: felineforum')}
});



//PASSPORT
passport.use(new LocalStrategy(
	function(username, password, done){
		var pword = crypto.createHash('md5').update(password).digest('hex');
		console.log(username+" "+password+" "+pword);
		userModel.findOne({'email' : username, 'password' : pword}, function ( err, doc){
			if(err){throw err, console.log(err)}
			if(err){ return done(err); }
			if(!doc){return done(null, false);}
			return done(null, doc);
		})
	}
));

passport.serializeUser(function (user, done) {
  done(null, user.email);
});

passport.deserializeUser(function (username, done) {
	console.log("this is username variable in deserializeUser: "+username)
  userModel.find({'email': username}, function (err, user) {
    done(err, user);
  });
});


var allowCrossDomain = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
   // res.header('Content-Type', 'application/json');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

//=========  Configuration  ===================
app.configure(function () {
	app.use(express.bodyParser());
	app.use(allowCrossDomain);
	app.use( express.cookieParser() );
	app.use(express.session({ secret: 'keyboard cat' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	// this project's files
	app.use( express.static( files ));
	// default favicon
	//app.use( express.favicon() );
});


app.post('/addUser', userApi.addUser);
app.post('/checkUsers', userApi.checkUsers)
app.post('/logout', userApi.logout);

app.post('/authenticate', function (req, res, next){
	passport.authenticate('local', function (err, user, info){
		if(err){ return next(err);}
		if(!user) {return res.send(200, {message : "Invalid username or password", loggedIn : false})}
		req.logIn(user, function (err){
			if(err){ return next(err);}
			var expiry = utilities.setCookieExpiry(1);
			var authUser = utilities.encryptSession(req.user.email);
			res.setHeader('Set-Cookie' , '_felidae_='+authUser+'; expires='+expiry);
			//res.json(200, {message : null, loggedIn : true});
			res.send(200, {message : null, loggedIn : true});
			//res.end();
			console.log(authUser);
		});
	})(req, res, next);
});


server.listen( port, function(){
	//console.log(files);
	console.log('Now listening to port: '+ port);
});