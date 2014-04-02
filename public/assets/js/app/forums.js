ForumApp.module('Forum', function ( Forums, ForumApp, Backbone, Marionette, $, _ ){

	Forums.Router = Marionette.AppRouter.extend({
		appRoutes : {
			'' : 'loginView',
			"home" : 'forumHome'
		}
	});

	var API = {
		forumHome : function (){
			console.log('Routes activated!');
			//ForumApp.Forums.HomeView.Controller.showHomeView();
			ForumApp.Forums.ForumView.Controller.ForumShow();
		},
		loginView : function (){
			ForumApp.Forums.HomeView.Controller.showHomeView();
		}
	};

	ForumApp.addInitializer( function (){
		new Forums.Router({
			controller : API
		});
	});
});