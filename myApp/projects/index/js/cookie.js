"use strict";
function setCookie(key,value,time){
	var oDate = new Date();
	oDate.setDate(oDate.getDate()+time);
	document.cookie = key+'='+encodeURI(value)+';expires='+oDate.toGMTString();
}

function getCookie(key){
	var reg = new RegExp("(^| )"+key+"=([^;]*)(;|$)");
	var arr = null;
	if(arr = document.cookie.match(reg)){
		return decodeURI(arr[2]);
	}else{
		return null;
	}
}

function deleteCookie(key){
	setCookie(key,'',-1);
}