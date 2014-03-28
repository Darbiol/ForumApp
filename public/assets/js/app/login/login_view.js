ForumApp.module('ForumApp.Login', function ( Login, ForumApp, Backbone, Marionette, $, _) {
	ForumApp.HomeView = Marionette.ItemView.extend({
		template : '#home-template',
		events : {
			'click button#login-button' : 'validateLogin'
		},
		validateLogin : function(e){
			e.preventDefault();
			var Email = $('#login-form');
			console.log('form validation. this is the form clicked:'+ form);
		}
	});
});