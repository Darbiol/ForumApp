var express = require( 'express' ),
app = express(),
http = require( 'http' ),
server = http.createServer( app ),
port = 3020,
path = require( 'path' ),
cwd = process.cwd(),
files = path.join( cwd ),

mongoose = require( 'mongoose' ),
userModel = require( './public/model/userModel.js' ),
userApi = require( './public/controller/userController.js' )

mongoose.connect('mongodb://root:root@ds035907.mongolab.com:35907/felineforum', function (err){
	if(err) {console.log(err);}
	else{console.log('connected to database: felineforum')}
});



var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

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
	app.use(app.router);
	// this project's files
	app.use( express.static( files ));
	// default favicon
	app.use( express.favicon() );
});


app.get('/getUsers', userApi.getAllUsers);//get all
app.post('/addUser', userApi.addUser);
app.get('/userProfile', userApi.getUserApi);

server.listen( port, function(){
	//console.log(files);
	console.log('Now listening to port: '+ port);
});