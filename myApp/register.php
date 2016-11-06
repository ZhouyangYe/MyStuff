<?php
require 'connect.php';
require 'core.php';
if(loggedin()){
	header('Location: index.php');
}else if(isset($_POST['username'])&&!empty($_POST['username'])&&isset($_POST['password'])&&!empty($_POST['password'])&&preg_match('/^.{8,16}$/',$_POST['password'])&&preg_match('/[a-zA-Z0-9]+/',$_POST['password'])&&preg_match('/^[\w-]{3,12}$/',$_POST['username'])){
	$username = $db->real_escape_string($_POST['username']);
	$password = $_POST['password'];
	$query = "SELECT * FROM userinfo WHERE `username`='".$username."'";
	if($query_result=$db->query($query)){
		$rows = $query_result->num_rows;
		if($rows==1){
			$query_result->free();
		}else{
			$query = "INSERT INTO userinfo (user_id, registered_on, username, password) VALUES('',NOW(),'$username','$password')";
			$query_result = $db->query($query);
			if($query_result){
				$query = "SELECT `user_id` FROM userinfo WHERE `username`='".$username."'";
				$query_result = $db->query($query);
				if($query_result){
					$row = $query_result->fetch_array(MYSQLI_ASSOC);
					$_SESSION['user_id'] = $row['user_id'];
					if($_SESSION['user_id']){
						$query_result->free();
						header('Location: index.php');
					}
				}
			}
		}
	}
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Register</title>
	<meta charset="utf-8">
	<link rel="stylesheet" href="css/main.css">
	<link href="projects/index/images/icons/bitbug_favicon.ico" rel="shortcut icon" />
	<script src="js/shadow.js"></script>
</head>
<body>
	<div id="wrapper">
	<div id="home"><a href="index.php">Home</a></div>
	<div id="login" class="reg">
		<div class="header"><h3 id="shadow">Register Form</h3></div>
		<form class="form clear" action="" method="post">
			<div class="err_msg"></div>
			<div class="user">
				<div class="icon_t"></div>
				<input class="box" type="text" value="" placeholder="Username" name="username"/>
			</div>
			<div class="password">
				<div class="icon_p"></div>
				<input class="box" type="password" value="" placeholder="Password" name="password"/>
			</div>
			<div class="password">
				<div class="icon_p"></div>
				<input class="box" type="password" value="" placeholder="Password" name="password"/>
			</div>
			<input class="button" type="submit" value="Submit"/>
		</form>
	</div>
	
	<footer><h1>@Zhouyang Ye 2016</h1><a href="http://zhouyangbt.ca">zhouyangbt.ca</a></footer>
	</div>
	<script src="js/register.js"></script>
</body>
</html>