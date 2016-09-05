<?php
require '../../../connect.php';
require '../../../core.php';
if(!loggedin()){
	header('Location: ../../../index.php');
}
?>
<!DOCTYPE html>
<html ng-app="mainApp">
<head>
	<meta charset="utf-8">
	<title>Angular 1</title>
	<link rel="stylesheet" href="style/main.css">
	<script src="../angular/angular.min.js"></script>
	<script src="../angular/angular-animate.min.js"></script>
	<script src="../angular/angular-resource.min.js"></script>
	<script src="../angular/angular-route.min.js"></script>
	<script src="modules/mainApp.module.js"></script>
	<script src="modules/mainApp.config.js"></script>
	<script src="modules/pic-list/picList.module.js"></script>
	<script src="modules/pic-list/picList.component.js"></script>
	<script src="modules/pic-detail/picDetail.module.js"></script>
	<script src="modules/pic-detail/picDetail.component.js"></script>
</head>
<body>
	<div ng-view class="view"></div>
</body>
</html>