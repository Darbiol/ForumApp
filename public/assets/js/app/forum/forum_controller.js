ForumApp.module('Forums.ForumView', function ( ForumView, ForumApp, Backbone, Marionette, $, _ ){

	ForumView.Controller = {
		ForumShow : function (){
			var layout = new ForumView.Layout();
			var container = new ForumView.MainRegion();
			var navbar = new ForumView.Navbar();
			var forum = new ForumView.Forum();
			var thread = new ForumView.ThreadView();


			console.log('this is Forum view triggered');
			container.show(layout);
			layout.navbarRegion.show(navbar);
			layout.forumRegion.show(thread);

		}
	}
});