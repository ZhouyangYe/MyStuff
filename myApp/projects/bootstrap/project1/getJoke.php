<?php
	$joke = file_get_contents('https://api.chucknorris.io/jokes/random');
	echo $joke;
?>