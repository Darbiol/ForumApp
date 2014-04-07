var ForumApp = new Marionette.Application();


	ForumApp.navigate = function ( route, options ) {
		options || (option = {})
		Backbone.history.navigate( route, options);
	}

	ForumApp.getCurrentRoute = function (){
		return Backbone.history.fragment;
	}

	ForumApp.on('initialize:after', function(){
		console.log('marionette started');
		//console.log(ForumApp);
		if(Backbone.history){
			Backbone.history.start();
			console.log("this is the cookie:");
			//check if session is logged in.redirect to login if user tries to access #forums
			// if(){

			// }
		}

	})
