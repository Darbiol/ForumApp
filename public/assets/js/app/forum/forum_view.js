ForumApp.module('Forums.ForumView', function ( ForumView, ForumApp, Backbone, Marionette, $, _){

	ForumView.Layout = Backbone.Marionette.Layout.extend({
		template : '#forum-layout-template',
		regions : {
			forumRegion : '#forum-region',
			navbarRegion : '#navbar-region'
		}
	});

	ForumView.MainRegion = Marionette.Region.extend({
		el : '#main-region'
	});

	ForumView.Navbar = Marionette.ItemView.extend({
		template : '#navbar-template'
	});

	ForumView.Forum = Marionette.ItemView.extend({
		template : '#forum-view-template'
	});

	ForumView.ThreadView = Marionette.ItemView.extend({
		template : '#thread-view-template'
	});


});