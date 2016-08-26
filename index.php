<?php
require 'connect.php';
require 'core.php';
 if(loggedin()){
	header('Location: projects/index/index.php');
}else{
	header('Location: login.php');
}
?>