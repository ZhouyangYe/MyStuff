<?php
require '../../../connect.php';
require '../../../core.php';
if(!loggedin()){
	header('Location: ../../../index.php');
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>react2</title>
	<script src="js/lib/build/react.js"></script>
	<script src="js/lib/build/react-dom.js"></script>
	<script src="js/lib/build/browser.min.js"></script>
	<script src="js/lib/jquery-3.1.0.min.js"></script>
	<link href="style/main.css" rel="stylesheet" />
</head>
<body>
	<div id="pictures"></div>
	<script type="text/babel" src="js/main.js"></script>
</body>
</html>