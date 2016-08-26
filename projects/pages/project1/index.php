<?php
require '../../../connect.php';
require '../../../core.php';
if(!loggedin()){
	header('Location: ../../../index.php');
}else if($_SESSION['user_id']!=1){
	header('Location: ../../error_pages/no_access.html');
}
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Crowdlinker</title>
	<meta name="keywords" content="Zhouyang Ye">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="lib/Chart.js"></script>
	<script type="text/javascript" src="js/chart.json"></script>
	<link href="style/main.css" rel="stylesheet" />
	<link href="style/responsive.css" rel="stylesheet" />
	<script src="js/main.js"></script>
</head>

<body>
	<div id="big_wrapper">
		<div id="header" class="clear">
			<div id="top_left"></div>
			<div id="top_right">
				<h3 id="rightText">Get free trial</h3>
				<a href="#"><h3>Buy now</h3></a>
			</div>
		</div>
		<div id="top_content">
			<h1>Share your Files with Ease</h1>
			<p>We push ourselves to new levels of inspired excellence with each project and we sweat creativity. </p>
			<a href="#"><h3 class="l">Buy now</h3><h3 class="r">€23</h3></a>
		</div>
		<div id="chart"><canvas id="myChart" width="2900" height="300"></canvas><div id="drag_wrapper"><div id="drag"><div><input type="button"/></div></div></div><h4>Drag to time travel</h4></div>
		<div id="content_f">
			<div class="up_wrapper">
				<div class="up">
					<p>We push ourselves to new levels of inspired excellence with each project and we sweat creativity. You won’t see anything until we’re done drooling at the result.</p>
					<a href="#"><h3>Buy now for €23</h3></a>
				</div>
				<div id="icon"></div>
			</div>
			<div class="down">
				<a id="la" href="javascript:;"><div class="larrow"></div></a>
				<div id="display" class="display">
					<div class="container">
						<div style="display:block;" class="post">
							<div class="pic"></div>
							<div class="content">
								<p class="p1">“Just started using awesome Module. Great way to boost the hard designing or prototyping process. Also a perfect tool for creative studios and freelancers”</p>
								<h4>Irina Bykova</h4>
								<p class="p2">Photographer, works with Slack team</p>
							</div>
						</div>
						<div class="post">
							<div class="pic"></div>
							<div class="content">
								<p class="p1">“Just started using awesome Module. Great way to boost the hard designing or prototyping process. Also a perfect tool for creative studios and freelancers”</p>
								<h4>Irina Bykova</h4>
								<p class="p2">Photographer, works with Slack team</p>
							</div>
						</div>
					</div>
				</div>
				<a id="ra" href="javascript:;"><div class="rarrow"></div></a>
			</div>
		</div>
		<div id="content_s">
			<h2>Choose Your License</h2>
			<div id="license_wrapper">
				<div class="frame">
					<div class="license">
						<div class="top">
							<h3>Personal</h3>
							<p>Just started using awesome Module. Great way to boost the hard designing or prototyping process. </p>
						</div>
						<div class="bottom">
							<div class="info clear">
								<h3>Free</h3>
								<p>Per month billed annualy or $250 from month to month</p>
							</div>
							<a href="#"><div class="btn">Get it</div></a>
						</div>
						<a class="ca" href="#"><div class="corner"></div></a>
					</div>
					<div class="license price">
						<div class="top">
							<h3>Agency</h3>
							<p>Also a perfect tool for creative studios and freelancers.</p>
						</div>
						<div class="bottom">
							<div class="info clear">
								<h3>123</h3>
								<p>Per month billed annualy or $250 from month to month</p>
							</div>
							<a href="#"><div class="btn">Get it</div></a>
						</div>
						<a class="ca" href="#"><div class="corner"></div></a>
					</div>
					<div class="license price">
						<div class="top">
							<h3>Unlimited</h3>
							<p>Living in today’s metropolitan world of cellular phones, mobile computers.</p>
						</div>
						<div class="bottom">
							<div class="info clear">
								<h3>232</h3>
								<p>Per month billed annualy or $250 from month to month</p>
							</div>
							<a href="#"><div class="btn">Get it</div></a>
						</div>
						<a class="ca" href="#"><div class="corner"></div></a>
					</div>
				</div>
			</div>
		</div>
		<div id="content_t">
			<h2>Become One of Us</h2>
			<p>Module 01 is big, stylish and handy UI Kit, full of many useful elements</p>
			<form action="#">
				<div class="box">
					<div class="icon"></div>
					<input class="text" id="email" type="text" value="E-mail address"/>
					<div class="btn"><input class="button" type="submit" value="Let's chat"/></div>
				</div>
			</form>
		</div>
		<div id="footer">
			<div class="footer_wrapper clear">
				<div class="footer_logo"></div>
				<div class="nav">
					<div class="w clear">
						<a href="#"><h3>Apps</h3></a>
						<a href="#"><h3>Gadgets</h3></a>
						<a href="#"><h3>Science</h3></a>
						<a href="#"><h3>Nature</h3></a>
						<a href="#"><h3>Creative</h3></a>
					</div>
				</div>
				<div class="copyright">© 2016 by Zhouyang Ye</div>
			</div>
		</div>
	</div>
</body>
</html>