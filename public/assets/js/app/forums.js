ForumApp.module('Forums', function ( Forums, ForumApp, Backbone, Marionette, $, _ ){

	Forums.Router = Marionette.AppRouter.extend({
		appRoutes : {
			'' : 'loginView',
			'home' : 'forumHome',
			'myAccount' : 'myAccount'
		}
	});

	var API = {
		forumHome : function (){
			console.log('Routes activated!');
			console.log(cookie);
			var cookie = ForumApp.Forums.ForumView.Controller.getCookie('_felidae_');
			if(cookie == 0 || cookie == undefined){
				ForumApp.navigate('');
				ForumApp.Forums.HomeView.Controller.showHomeView();
			}else{
				ForumApp.navigate('#home');
				ForumApp.Forums.ForumView.Controller.ForumShow();
			}
		},
		loginView : function (){
			var cookie = ForumApp.Forums.ForumView.Controller.getCookie('_felidae_');
			if(cookie == 0 || cookie == undefined){
				ForumApp.navigate('');
				ForumApp.Forums.HomeView.Controller.showHomeView();
			}else{
				ForumApp.navigate('#home');
				ForumApp.Forums.ForumView.Controller.ForumShow();
			}
		},
		myAccount : function (){

		}
	};

	ForumApp.addInitializer( function (){
		new Forums.Router({
			controller : API
		});
	});
});