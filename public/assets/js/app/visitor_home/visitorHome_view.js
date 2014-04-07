ForumApp.module('Forums.HomeView', function ( HomeView, ForumApp, Backbone, Marionette, $, _ ){

	//layout
	HomeView.VisitorLayout = Backbone.Marionette.Layout.extend({
		initialize : function() {
		},
		template : '#login-register-template',
		regions : {
			registerRegion : '#register-region',
			loginRegion : '#login-region',
			navbarRegion : '#navbar-region'
		}
	});


	// MAIN Region
	HomeView.MainRegion = Marionette.Region.extend({
		el : '#main-region'
	})


	//navbar Item view
	HomeView.VisitorNavbarView = Marionette.ItemView.extend({
		template : '#visitor-navbar-template'
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
                text : 'You have successfully registered to this website. An email has been sent to your email address 	with your login information.',
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
			'click button#login-button' : 'checkLogin',
		},
		goToForgotPassword : function (e){
			e.preventDefault();
			console.log('change vuew');
			ForumApp.trigger('user:forgotView');
		},
		checkLogin : function (e){
			e.preventDefault();
			console.log('checkLogin');
			//this.trigger('user:login');
			this.authenticate();
		},
		authenticate : function (){
			var loginData = {
				"username" : $( '#login-username' ).val(),
				"password" : $( '#login-password' ).val()
			}
			var self = this;
			console.log(loginData);
			$.ajax({
				type : 'POST',
				url : 'http://localhost:3020/authenticate',
				data : loginData,
				success : function ( data, textStatus, jqXHR ){

					console.log('success')
					console.log(jqXHR.getAllResponseHeaders());
					if( data.loggedIn == true ){
						console.log("ok to change page");
						ForumApp.trigger('user:login', data);
					}else{
						console.log(data.message);
						self.invalidLogin(data.message);
					}
				},
				failed : function ( jqXHR, textStatus, errorThrown ){
					console.log('failed')
				}
			});
		},
		invalidLogin : function ( message ){
			var form = $('#login-form');
			var formChildren = form.children('div');
			formChildren.addClass('has-error');
			formChildren.children('.error-message').html(message).css('color', '#a94442').css('font-weight','normal	')
			console.log(formChildren);
		}

	});

	//Forgot password Item View
	HomeView.ForgotPasswordView = Marionette.ItemView.extend({
		initialize : function() {
			this.on( 'user:forgot' );
		},
		template : '#forgot-password-template',
		events : {
			'click a#back-to-login' : 'backToLogin'
		},
		backToLogin : function (e){
			e.preventDefault();
			console.log('go back to login');
			ForumApp.trigger('user:loginView');
		}
	});
});