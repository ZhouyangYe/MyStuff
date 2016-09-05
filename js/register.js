doShadow();
var sub = {};
sub.uValid = false;
sub.pValid = false;
var oReg = document.getElementById('login');
var oForm = oReg.getElementsByClassName('form')[0];
var oUser = document.getElementsByName('username')[0];
var aPass = document.getElementsByName('password');
var oError = oReg.getElementsByClassName('err_msg')[0];
var reg = [/^.{8,16}$/,/[a-zA-Z0-9]+/];

oForm.onsubmit = function(){
	var uFormat = (/^[\w-]{3,12}$/).test(oUser.value);
	var pFormat = true;
	for(var i=0;i<2;i++){
		pFormat = pFormat&&reg[i].test(aPass[0].value)&&reg[i].test(aPass[1].value);
	}
	if(aPass[0].value==aPass[1].value&&!(/^\s*$/).test(aPass[0].value)&&!(/^\s*$/).test(aPass[1].value)){
		sub.pValid = true;
	}else{
		sub.pValid = false;
	}
	if((/^\s*$/).test(oUser.value)){
		oError.innerHTML = "Username cannot be empty!";
	}else if(!sub.uValid){
		oError.innerHTML = "Invalid username!";
	}else if((/^\s*$/).test(aPass[0].value)||(/^\s*$/).test(aPass[1].value)){
		oError.innerHTML = "Password cannot be empty!";
	}else if(!sub.pValid){
		oError.innerHTML = "Passwords do not match!";
	}else if(!uFormat){
		oError.innerHTML = 'Length of username should be from 3 to 12.(Consists of numbers characters and "-" or "_")';
	}else if(!pFormat){
		oError.innerHTML = "Length of password should be from 8 to 16.(Consists at least 1 number or character)";
	}
	//console.log(sub.uValid&&sub.pValid);
	return (sub.uValid&&sub.pValid&&uFormat&&pFormat);
}
oUser.onblur = function(){
	if(!(/^\s*$/).test(oUser.value)){
		ifValid(oUser,oError,sub);
	}
}
	
function ifValid(oUser,oError,sub){
	var xhr = null;
	try{
		xhr = new XMLHttpRequest();
	}catch(e){
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4&&xhr.status==200){
			//console.log(xhr.responseText);
			handleResponse(xhr.responseText,oError,sub);
		}
	}
	xhr.open('post','APIs/register.valid.php',true);
	xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
	xhr.send('username='+oUser.value);
}
function handleResponse(data,oError,sub){
	var json = JSON.parse(data);
	if(json.valid){
		oError.innerHTML = "Yes, you can use this ID!";
	}else{
		oError.innerHTML = "Sorry, this ID has been registered, please try other one!";
	}
	sub.uValid = json.valid;
}