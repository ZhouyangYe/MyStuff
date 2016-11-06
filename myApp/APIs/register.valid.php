<?php
require '../connect.php';
if(isset($_POST['username'])&&!empty($_POST['username'])){
	$username = $db->real_escape_string($_POST['username']);
	$query = "SELECT `username` FROM userinfo WHERE `username`='".$username."'";
	if($query_result = $db->query($query)){
		$rows = $query_result->num_rows;
		if($rows==1){
			echo '{"valid":false}';
		}else if($rows==0){
			echo '{"valid":true}';
		}
	}	
}
?>