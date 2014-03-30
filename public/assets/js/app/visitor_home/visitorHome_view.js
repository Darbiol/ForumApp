ForumApp.module('Forums.HomeView', function ( HomeView, ForumApp, Backbone, Marionette, $, _ ){

	//layout
	HomeView.VisitorLayout = Backbone.Marionette.Layout.extend({
		template : '#login-register-template',
		regions : {
			registerRegion : '#register-region',
			loginRegion : '#login-region'
		}
	});

	//Region
	HomeView.MainRegion = Marionette.Region.extend({
		el : '#main-region'
	})

	//Register Item View
	HomeView.RegisterView = Marionette.ItemView.extend({
		template : '#register-template',
		events : {
			 'click button#register-button' : 'verifyInputs',
			 
		},
		verifyInputs : function(e){
			e.preventDefault();
			console.log('verify inputs here');
			this.addNewUser();
		},
		addNewUser : function(){
			var data = {
				"email" : $('#register-email').val(),
				"password" : $('#register-password').val(),
				"firstName" : $('#register-firstName').val(),
				"lastName" : $('#register-lastName').val(),
				"dateOfBirth" : $('#register-dateOfBirth').val(),
				"securityQuestion" : $('#register-security-question').val(),
				"securityAnswer" : $('#register-security-answer').val(),
			}
			console.log('register user here');
			this.trigger('user:register', data);
		},
		clearFields : function (){
			console.log('clearing fields');
				$('#register-email').val('');
				$('#register-password').val('');
				$('#register-firstName').val('');
				$('#register-lastName').val('');
				$('#register-dateOfBirth').val('');
				$('#register-security-question').val('');
				$('#register-security-answer').val('');
		},
		showSuccessNotification : function () {
			$.pnotify({
                title : 'Success!',
                text : 'You have successfully registered to this website.',
                type : 'success',
                opacity : 1,
                delay : 1500,
                shadow : false,
                icon : false
            });
		},
		showFailedNotification : function (){
			$.pnotify({
                title: 'Failed!!',
                text: 'Your registration for this website has failed. Please try again.',
                type: 'error',
                addclass: "alert-danger",
                opacity: 1,
                delay: 1500,
                shadow : false,
                icon : false
            });
		}
	})

	//Login Item View
	HomeView.LoginView = Marionette.ItemView.extend({
		template : '#login-template',
		events : {
			'click a#forgot-password' : 'goToForgotPassword',
			'click button#login-button' : 'checkLogin'
		},
		goToForgotPassword : function (e){
			e.preventDefault();
			console.log('change vuew');
			this.trigger('user:forgot');
		},
		checkLogin : function (e){
			e.preventDefault();
			console.log('checkLogin');
		}

	});

	//Forgot password Item View
	HomeView.ForgotPasswordView = Marionette.ItemView.extend({
		template : '#forgot-password-template',
		events : {
			'click a#back-to-login' : 'backToLogin'
		},
		backToLogin : function (e){
			e.preventDefault();
			console.log('go back to login');
			this.trigger('user:login');
		}
	});
});