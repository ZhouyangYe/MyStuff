<?php
require 'connect.php';
require 'core.php';
if(loggedin()){
	header('Location: index.php');
}else if(isset($_POST['username'])&&!empty($_POST['username'])&&isset($_POST['password'])&&!empty($_POST['password'])){
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
	<script src="js/move.js"></script>
	<script src="js/play.js"></script>
	<script src="js/shadow.js"></script>
	<script src="js/register.js"></script>
</head>
<body>
	<div id="wrapper">
	<div id="home"><a href="index.php">Home</a></div>
	<div id="login">
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
	
	<section id="play">
		<div class="prev">
			<img src="images/prev.png"></img>
			<img src="images/prev.png"></img>
		</div>
		<div class="next">
			<img src="images/next.png"></img>
			<img src="images/next.png"></img>
		</div>
		<ul>
			<li class="middle"><span><img src="images/bg1.jpg"></img></span><div></div><img class="shadow" src="images/shadow.png"></img></li>
			<li class="left"><span><img src="images/bg2.jpg"></img></span><div></div><img class="shadow" src="images/shadow.png"></img></li>
			<li class="right"><span><img src="images/bg3.jpg"></img></span><div></div><img class="shadow" src="images/shadow.png"></img></li>
		</ul>
	</section>
	
	<footer><h1>@Zhouyang Ye 2016</h1><a href="http://zhouyangbt.ca">zhouyangbt.ca</a></footer>
	</div>
</body>
</html>