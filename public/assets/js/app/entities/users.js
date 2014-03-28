ForumApp.module('ForumApp.Entities', function ( Entities, ForumApp, Backbone, Marionette, $, _){
	//Models
	var UserModel = Backbone.Model.extend({});

	//Contacts
	var UsersCollections = Backbone.Collection.extend({
		model :Entities.UserModel
	});


	//init Users
	var users;
	var initUsers = function(){
		users = new Entities.UsersCollections();
	}

});