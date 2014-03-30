var ForumApp = new Marionette.Application();



ForumApp.on('initialize:after', function(){
	console.log('marionette started');
	console.log(ForumApp);
	ForumApp.Forums.HomeView.Controller.showHomeView();
		
})
