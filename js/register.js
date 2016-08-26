window.onload = function(){
	play();
	doShadow();
	var sub = {};
	sub.uValid = false;
	sub.pValid = false;
	var oReg = document.getElementById('login');
	var oForm = oReg.getElementsByClassName('form')[0];
	var oUser = document.getElementsByName('username')[0];
	var aPass = document.getElementsByName('password');
	var oError = oReg.getElementsByClassName('err_msg')[0];
	oForm.onsubmit = function(){
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
		}
		//console.log(sub.uValid&&sub.pValid);
		return (sub.uValid&&sub.pValid);
	}
	oUser.onblur = function(){
		if(!(/^\s*$/).test(oUser.value)){
			ifValid(oUser,oError,sub);
		}
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