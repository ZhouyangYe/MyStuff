<?php
header('Content-type:text/html; charset="utf-8"');
$opts = array(
  'http'=>array(
    'method'=>"GET",
    'header'=>"Cache-Control: no-cache\r\n"
  )
);
$cpage = isset($_GET['cpage']) ? $_GET['cpage'] : 1;

$context = stream_context_create($opts);

$url = 'http://www.wookmark.com/api/json/popular?page='.$cpage;

$content = file_get_contents($url, false, $context);

echo $content;
?>