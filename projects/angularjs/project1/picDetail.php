<?php
$id = isset($_GET['id'])?$_GET['id']:'hello';
$info = 'Here comes the info of picture '.$id.': ..........';
echo '{"info": '.'"'.$info.'"'.'}';
?>