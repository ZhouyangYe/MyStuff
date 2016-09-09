<?php
require '../../connect.php';
require '../../core.php';
if(!loggedin()){
	header('Location: ../../index.php');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>yzy Bright ``` Home</title>
	<link type="text/css" href="style/main.css" rel="stylesheet" />
	<link href="images/icons/bitbug_favicon.ico" rel="shortcut icon" />
	<script src="js/ajax.js"></script>
</head>
<body>
<!--loading page-->
<div id="loading">
	<div class="progressbar"><span>0%</span><div class="inner"><span>0%</span></div></div>
</div>
<script src="js/loading.js"></script>
<!--loading page end-->
</body>
</html>