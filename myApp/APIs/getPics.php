<?php
require '../connect.php';
if(isset($_GET['type'])&&!empty($_GET['type'])){
	$type = $_GET['type'];
	$query = "SELECT * FROM `picinfo` WHERE `type` = '".$type."' AND `status` = 'active'";
}else{
	$query = "SELECT * FROM `picinfo` WHERE `status` = 'active'";
}
if($query_result = $db->query($query)){
	$result = array();
	while($row = $query_result->fetch_assoc()){
		$pic = array('url'=>$row['url'],'name'=>$row['name']);
		array_push($result,$pic);
	}
	$query_result->free();
	echo json_encode($result);
}else{
	die('There is an error running the query!');
}
?>