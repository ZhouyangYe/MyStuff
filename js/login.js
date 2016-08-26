window.onload = function(){
	var oUser = document.getElementsByName('username')[0];
	var oPass = document.getElementsByName('password')[0];
	oUser.value = 'visitor';
	oPass.value = 'visitor';
	play();
	doShadow();
}