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