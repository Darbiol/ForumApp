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
			});


			console.log(layout.loginRegion);
			ForumApp.on('user:forgotView', function(){
				layout.loginRegion.show(new HomeView.ForgotPasswordView());
			})

			ForumApp.on('user:loginView', function(){
				layout.loginRegion.show(new HomeView.LoginView());
			})

			ForumApp.on('user:login', function (data){
				console.log(this);
				ForumApp.navigate('home');
				ForumApp.Forums.ForumView.Controller.ForumShow();
			});

			container.show(layout);
			layout.navbarRegion.show(navbarView);
			layout.registerRegion.show(registerView);
			layout.loginRegion.show(loginView);
		}
	}
})