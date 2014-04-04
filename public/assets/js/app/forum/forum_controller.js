ForumApp.module('Forums.ForumView', function ( ForumView, ForumApp, Backbone, Marionette, $, _ ){

	ForumView.Controller = {
		ForumShow : function (){
			var layout = new ForumView.Layout();
			var container = new ForumView.MainRegion();
			var navbar = new ForumView.Navbar();
			var forum = new ForumView.Forum();
			var thread = new ForumView.ThreadView();

			ForumApp.on('user:logout', function(){
				console.log('userlogout');
				$.ajax({
					type : 'POST',
					url : 'http://localhost:3020/logout',
					success : function ( data, textStatus, jqXHR ){
						ForumApp.trigger('user:logout-redirect')
					},
					error : function ( jqXHR, textStatus, errorThrown ){

					}
				});
			});

			ForumApp.on('user:logout-redirect', function(){
				console.log('this is logout redirect');
				ForumApp.navigate('');
				ForumApp.Forums.HomeView.Controller.showHomeView();
			});


			console.log('this is Forum view triggered');
			container.show(layout);
			layout.navbarRegion.show(navbar);
			layout.forumRegion.show(thread);

		}
	}
});