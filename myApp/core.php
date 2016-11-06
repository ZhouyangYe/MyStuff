<?php
session_start();
function loggedin(){
	if(isset($_SESSION['user_id'])&&!empty($_SESSION['user_id'])){
		return true;
	}else{
		return false;
	}
}
function setLocation(){//reserved
	$time = 7;
	//setCookie("location","url",time()+$time,'/');
}
?>