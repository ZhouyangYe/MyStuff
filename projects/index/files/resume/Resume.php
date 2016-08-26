<?php
require '../../../../connect.php';
require '../../../../core.php';
if(!loggedin()){
	header('Location: ../../../index.php');
}
?>

<!DOCTYPE html>
<html>
<head>
	<title>yzy Bright ``` Resume</title>
	<meta charset="utf-8">
	<link href="../../images/icons/bitbug_favicon.ico" rel="shortcut icon" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
	<script src="pdfobject.min.js"></script>
	<style>
		html{overflow:hidden;}
		body{margin:0;padding:0;height:100%;}
		.pdfobject-container { width:100%;height:100%;}
	</style>
	<script>
		$(function(){
			$('body').height($(window).height());
			$(window).resize(function(){
				$('body').height($(window).height());
			});
			PDFObject.embed("resume.pdf","#resume");
		});
	</script>
</head>
<body>
	<div id="resume"></div>
</body>
</html>