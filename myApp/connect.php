<?php
$mysqli_host = 'localhost';
$mysqli_user = 'admin';
$mysqli_pass = 'admin';
$mysqli_db = 'time_manage';
$db = new mysqli($mysqli_host,$mysqli_user,$mysqli_pass,$mysqli_db);
if($db->connect_error){
	die('Unable to connect to the database.');
}
?>