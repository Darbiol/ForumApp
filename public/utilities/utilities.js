exports.GeneratePassword = function (){
	var validKeys = 'ZXCVBNMASDFGHJKLQWERTYUIOPqwertyuiopasdfghjklzxcvbnm1234567890';
	var password = '';
	var passwordLength = 8;
	var i;
	var randomVal;
	for(i=0;i<passwordLength;i++){
		randomVal = Math.floor(Math.random()*validKeys.length)
		password += validKeys[randomVal];
	}
	return password;
}

exports.encryptSession = function ( user ){
	var encryptedUser = '';
	for(var i=0; i<user.length;i++){
	   var temp = (parseInt(user.charCodeAt(i))^1)<<1;
	   encryptedUser += String.fromCharCode(temp);
	}
	return encryptedUser;
}

exports.decryptSession = function ( string ){
	var converted = '';
	for(var j=0;j<encryptedUser.length;j++){
	   var temp = (encryptedUser.charCodeAt(j)>>1)^1;
	   convert += String.fromCharCode(temp);
	}
	return convert;
}

exports.setCookieExpiry = function( days ){
	var date = new Date();
	var hours = 24;
	var mins= 60;
	var secs= 60;
	var miliSecs = 1000;
	var expiryDays = 1;
	date.setTime(date.getTime() + (expiryDays*hours*mins*secs*miliSecs));
	var expiry = "expires="+date.toGMTString();

	return expiry;
}

exports.getCookie = function ( cookies ){
	if(cookies._felidae_ === undefined){
		//not logged in.
	}else{
		return cookies._felidae_;
	}
}

exports.deleteCookie = function ( res ){
		return res.clearCookie('_felidae_');
}

