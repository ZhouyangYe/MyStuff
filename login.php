<?php
require 'connect.php';
require 'core.php';
$error_message = '';
if(loggedin()){
	header('Location: index.php');
}else if(isset($_POST['username'])&&isset($_POST['password'])){
	$username = $db->real_escape_string($_POST['username']);
	$password = $db->real_escape_string($_POST['password']);
	if(!empty($username)&&!empty($password)){
		$query = "SELECT * FROM userinfo WHERE `username`='".$username."'AND `password`='".$password."'";
		if($query_result=$db->query($query)){
			$rows = $query_result->num_rows;
			if($rows==1){
				$row = $query_result->fetch_array(MYSQLI_ASSOC);
				$user_id = $row['user_id'];
				$_SESSION['user_id'] = $user_id;
				$query_result->free();
				header('Location: index.php');
			}else if($rows==0){
				$error_message = 'Wrong combination of user name and password!';
			}
		}
	}else{
		$error_message = 'Please enter both the user name and password';
	}
}

?>

<!DOCTYPE html>
<html>
<head>
	<title>Log In</title>
	<meta charset="utf-8">
	<link rel="stylesheet" href="css/main.css">
	<link href="projects/index/images/icons/bitbug_favicon.ico" rel="shortcut icon" />
	<script src="js/move.js"></script>
	<script src="js/play.js"></script>
	<script src="js/shadow.js"></script>
	<script src="js/login.js"></script>
</head>
<body>
	<div id="wrapper">
	<div id="register"><a href="register.php">Register</a></div>
	
	<div id="login">
		<div class="header"><h3 id="shadow">Login Form</h3></div>
		<form class="form clear" action="" method="post">
			<div class="err_msg"><?php echo $error_message;?></div>
			<div class="user">
				<div class="icon_t"></div>
				<input class="box" type="text" value="" placeholder="Username" name="username"/>
			</div>
			<div class="password">
				<div class="icon_p"></div>
				<input class="box" type="password" value="" placeholder="Password" name="password"/>
			</div>
			<input class="button" type="submit" value="Sign In"/>
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