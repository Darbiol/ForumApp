ForumApp.module('Forums.ForumView', function ( ForumView, ForumApp, Backbone, Marionette, $, _ ){

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

//================  Myaccount layout ===========
	ForumView.MyAccountLayout = Backbone.Marionette.Layout.extend({
		template : '#myAccount-layout',
		regions : {
			profileHeader : '#profile-header-region',
			profileInfo : '#profile-info-region'
		},
		'onShow' : function (){
			this.profileHeader.show(this.profileHeaderView);
			this.profileInfo.show(this.profileInfoView);
		},
		initialize : function (){
			this.profileHeaderView = new ForumView.ProfHeader();
			this.profileInfoView = new ForumView.ProfileInfo();

		}
	});
//=============== My Account profile header ===============
	ForumView.ProfHeader = Marionette.ItemView.extend({
		template : '#profiles-header-template'
	});

//============= My Account profile information =============
	ForumView.ProfileInfo = Marionette.ItemView.extend({
		template : '#profile-info-template'
	});


	// ========= NAVBAR VIEW ========================
	ForumView.Navbar = Marionette.ItemView.extend({
		template : '#navbar-template',
		events : {
			'click a#logout' : 'logout',
			'click a#my-account' : 'myAccountLink'
		},
		logout : function (e){
			e.preventDefault();
			//console.log(this)
			console.log('client logout');
			ForumApp.trigger('user:logout');
		},
		myAccountLink : function (e){
			e.preventDefault();
			console.log('go to my account');
			ForumApp.trigger('user:myAccount');
		}
	});

//=====================  My Account ======================
	// ForumView.ProfileHeader = Marionette.ItemView.extend({
	// 	template : '#profile-info-template',
	// });

// ===========================================================
	ForumView.Forum = Marionette.ItemView.extend({
		template : '#forum-view-template'
	});

	ForumView.ThreadView = Marionette.ItemView.extend({
		template : '#thread-view-template'
	});


});