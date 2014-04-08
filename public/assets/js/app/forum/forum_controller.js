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

			ForumApp.on('user:myAccount', function(){
				//var profileLayout =
				//var view = new ForumView.ProfileHeader()
				//var x = profileLayout.profileHeader.show(view);
				//console.log(profileLayout.profileHeader);
				layout.forumRegion.show(new ForumView.MyAccountLayout());
			});

			console.log('this is Forum view triggered');
			container.show(layout);
			layout.navbarRegion.show(navbar);
			layout.forumRegion.show(thread);

		},
		setCookie : function ( cookieName, cookieValue, expiryDays ) {
			var date = new Date();
			var hours = 24;
			var mins= 60;
			var secs= 60;
			var miliSecs = 1000;
			date.setTime(date.getTime() + (expiryDays*hours*mins*secs*miliSecs));
			var expiry = "expires="+date.toGMTString();
			return document.cookie = cookieName+'='+cookieValue+'; '+expiry;

		},
		getCookie : function ( cookieName ) {
			var cookieArr = document.cookie.split(';');
			var cookie;
			var lowerLimit = cookieName+'=';
			var i = 0;
			for(i=0;i<cookieArr.length;i++){
				cookie = cookieArr[i].trim();
				if(cookie.indexOf(cookieName) == 0){
					return cookie.substring(lowerLimit.length, cookie.length);
				}else{

				}
			}
		},
		checkCookie : function (){
			var user = this.getCookie();
			return user;
		}
	}
});