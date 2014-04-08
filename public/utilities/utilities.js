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
	var alpha1 = "1234567890qwertyuiopasdfghjklzxcvbnm@._QWERTYUIOPASDFGHJKLZXCVBNM";
	var alpha2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890_.@";
	var encoded = '';
	for(var i=0;i<user.length;i++){
		var charAt = user.charAt(i);
		var index = alpha2.indexOf(charAt); //
		encoded += alpha1.charAt(index);
	}
	return encoded;
}

exports.decryptSession = function ( string ){
	//var enc_user = "jTknW.NzjQnx.Mv_jn.NlW_";
	var alpha1 = "1234567890qwertyuiopasdfghjklzxcvbnm@._QWERTYUIOPASDFGHJKLZXCVBNM";
	var alpha2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890_.@";
	var decoded = '';
	for(var i=0;i<string.length;i++){
		var charAt = user.charAt(i);
		var index = alpha1.indexOf(charAt); //
		decoded += alpha2.charAt(index);
	}
	return decoded;
}

exports.setCookieExpiry = function( days ){
	var date = new Date();
	var hours = 24;
	var mins= 60;
	var secs= 60;
	var miliSecs = 1000;
	var expiryDays = 1;
	date.setTime(date.getTime() + (expiryDays*hours*mins*secs*miliSecs));
	var expiry = date.toGMTString();

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

