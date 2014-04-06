ForumApp.module('Forums.HomeView', function ( HomeView, ForumApp, Backbone, Marionette, $, _ ){

	HomeView.Controller = {
		showHomeView : function(){
			var layout = new HomeView.VisitorLayout();
			var container = new HomeView.MainRegion();

			var loginView = new HomeView.LoginView();
			var registerView = new HomeView.RegisterView();
			var forgotView = new HomeView.ForgotPasswordView();
			var navbarView = new HomeView.VisitorNavbarView();



			registerView.on('user:register', function ( registerData ){
				var self = this;
				console.log('controller here, good to register', registerData);
				console.log($('#register-email').val());
				$.ajax({
					type : 'POST',
					url : 'http://localhost:3020/addUser',
					data : registerData,
					success : function (data, textStatus, jqXHR){
						console.log('success');
						self.clearFields();
						self.showSuccessNotification();
					},
					error : function (jqXHR, textStatus, errorThrown){
						console.log('failed')
						self.showFailedNotification();
					}
				});

				//clear all fields and notify that registration was a success.

			});

			// loginView.on('user:forgot', function(){
			// 	//loginView.close();
			// 	//layout.loginRegion.reset();
			// 	//forgotView = new HomeView.ForgotPasswordView();
			// 	layout.loginRegion.show(forgotView);
			// });

			// forgotView.on('user:login', function(){
			// 	//layout.loginRegion.hide(forgotView);
			// 	//forgotView.close();
			// 	//layout.loginRegion.reset();
			// 	//loginView = new HomeView.LoginView();
			// 	layout.loginRegion.show(loginView);
			// });

			console.log(layout.loginRegion);
			ForumApp.on('user:forgotView', function(){
				//console.log('Region getting emits');
				layout.loginRegion.show(new HomeView.ForgotPasswordView());
			})

			ForumApp.on('user:loginView', function(){
				//console.log('Region getting emits');
				layout.loginRegion.show(new HomeView.LoginView());
			})

			ForumApp.on('user:login', function (data){
				console.log(this);
				//this.setCookie('loggenIn', data.loggenIn, 30)
				//change route
				ForumApp.navigate('home');
				//change view
				ForumApp.Forums.ForumView.Controller.ForumShow();
			});

			container.show(layout);
			layout.navbarRegion.show(navbarView);
			layout.registerRegion.show(registerView);
			layout.loginRegion.show(loginView);
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
			var cookieArr = document.cookie.split();
			var cookie;
			var lowerLimit = cookieName+'=';
			var i = 0;
			for(i=0;i<cookieArr.length;i++){
				cookie = cookieArr[i].trim();
				if(cookie.indexOf(cookieName)==0){
					return cookie.substring(lowerLimit.length, cookie.length);
				}else{
					return 0;
				}
			}
		},
		checkCookie : function (){
			var user = this.getCookie();
			return user;
		}
	}
})