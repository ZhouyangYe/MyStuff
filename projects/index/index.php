<?php
require '../../connect.php';
require '../../core.php';
if(!loggedin()){
	header('Location: ../../index.php');
}else if($_SESSION['user_id']==1){
	$name = 'Zhouyang';
	$title = 'Your';
}else{
	$query = "SELECT username FROM userinfo WHERE `user_id`='".$_SESSION['user_id']."'";
	if($query_result=$db->query($query)){
		$row = $query_result->fetch_array();
		$name = $row[0];
		$title = 'BT\'s';
	}
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>yzy Bright ``` Home</title>
	<link type="text/css" href="style/main.css" rel="stylesheet" />
	<link href="images/icons/bitbug_favicon.ico" rel="shortcut icon" />
	<base target="_blank" />
	<script src="js/move.js"></script>
	<script src="js/cookie.js"></script>
	<script src="js/main.js"></script>
</head>
<body>
<!--Lights-->
<div id="buttons" class="clear"><div class="button"><div></div></div><div class="button"><div></div></div><div class="button"><div></div></div></div>
<!--Lights end-->

<!--notice board-->
<main id="notice" class="hidden">
	<article>
		<h1 class="contentH">Hi, this is Bright!</h1>
		<p class="contentH"><span>Hello, My name is Zhouyang Ye, I'm currently living in Ottawa, this is my personal website and it's still being built.<br/><br/>I am a front-end web developer. I meant to practice and solidify my foundations of web development by building this website, this page is built using PHP, MySQL, pure Javascript, HTML and CSS, without using frameworks or libraries. Everything in this website is my own work, no copy and paste excluding the images and libruaries such as JQuery, React and PDF.js.<br/><br/>If you have any advice on my website or work/project opportunities, please contact me on email <a href="mailto:zye0821@gmail.com">zye0821@gmail.com</a>.<br/><br/>I hope you enjoy my website!</span></p>	
	</article>
	<div class="close">X</div>
</main>
<!--notice board end-->

<!--logout-->
	<a id="door" href="../../logout.php" target="_self">
		<div class="pivot"></div>
		<div class="pivot"></div>
		<div class="sign">Exit</div>
		<div class="inner">
			<div class="window">
				<div class="edge"></div>
				<div class="edge"></div>
				<div class="edge"></div>
				<div class="edge"></div>
			</div>
			<div class="window">
				<div class="edge"></div>
				<div class="edge"></div>
				<div class="edge"></div>
				<div class="edge"></div>
			</div>
			<div class="window">
				<div class="edge"></div>
				<div class="edge"></div>
				<div class="edge"></div>
				<div class="edge"></div>
			</div>
			<div class="window">
				<div class="edge"></div>
				<div class="edge"></div>
				<div class="edge"></div>
				<div class="edge"></div>
			</div>
			<div id="over">
				<div class="overlap"></div>
				<div class="overlap"></div>
				<div class="overlap"></div>
				<div class="overlap"></div>
				<div class="overlap"></div>
				<div class="overlap"></div>
			</div>
			<div class="lEdge"></div>
			<div class="lEdge"></div>
			<div class="tEdge"></div>
			<div class="handler"></div>
		</div>
		<div class="cover"></div>
		<div class="stone"><div></div></div>
		<div id="roads">
			<div class="road"></div>
			<div class="road"></div>
			<div class="road"></div>
		</div>
	</a>
<!--lougout end-->

<!--side board-->
	<div id="li_wrap">
		<div id="list">
			<span class="strip"></span>
			<span class="strip"></span>
			<h3>Hi <?php echo $name;?> !</h3>
			<div>
				<span>Tel: <a href="tel:15062928077">(506)292-8077</a></span>
				<div>
					<span>Email: <a href="mailto:zye0821@gmail.com">zye0821@gmail.com</a></span>
					<div>
						<span>Facebook: <a href="https://www.facebook.com/zhouyang.b.ye">Zhouyang Ye</a></span>
						<div>
							<span>LinkedIn: <a href="https://ca.linkedin.com/in/zhouyang-ye-35445311a">Zhouyang Ye</a></span>
							<div>
								<span>Address:<a href="#">1021 Barwell,Ottawa</a></span>
								<div>
									<span>Wechat: <a href="#">bewhat1wannabe</a></span>
									<div>
										<span>QQ: <a href="#">810036635</a></span>
										<div>
											<span>Resume: <a href="files/resume/Resume.php">Zhouyang Ye</a></span>
											<div>
												<span>Github: <a href="https://github.com/ZhouyangYe/">Zhouyang Ye</a></span>
												<div>
													<span>Administration: <a href="#">Reserved</a></span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
<!--side board end-->

<!--bouncing board-->
	<div id="bWrap">
		<div class="arrow">
			<div class="head"></div>
			<div class="body">look</div>
		</div>
		<div class="cover"></div>
		<div class="side"><a href="javascript:;" target="_self">tap me</a></div>
		<div class="board clear">
			<div class="close">X</div>
			<img class="logo" src="images/logo_leaf.png" alt=""/>
			<article class="clear">
				<h3><?php echo $title;?> Work</h3>
				<ul></ul>
				<div id="options" class="options"></div>
			</article>
		</div>
	</div>
<!--bouncing board end-->

<section class="blocks">
<!--about me-->
	<div id="info"><h3>About me</h3></div>
<!--about me end-->
<!--sliding pictures-->
	<div id="play">
		<div class="prev">
			<img src="images/prev.png" alt=""/>
			<img src="images/prev.png" alt=""/>
		</div>
		<div class="next">
			<img src="images/next.png" alt=""/>
			<img src="images/next.png" alt=""/>
		</div>
		<ul>
			<li class="middle"><span><img src="images/bg1.jpg" alt=""/></span><div></div><img class="shadow" src="images/shadow.png" alt=""/></li>
			<li class="left"><span><img src="images/bg2.jpg" alt=""/></span><div></div><img class="shadow" src="images/shadow.png" alt=""/></li>
			<li class="right"><span><img src="images/bg3.jpg" alt=""/></span><div></div><img class="shadow" src="images/shadow.png" alt=""/></li>
		</ul>
	</div>
<!--sliding pictures end-->
<!--photo-->
	<section id="album">
		<div class="cover"><h3>A l b u m</h3></div>
		<ul class="pictures">
			<li><img src="images/photos/photo1.jpg" alt=""/></li>
		</ul>
	</section>
<!--photo end-->
<!--bulb and light-->
	<div id="light">
		<div class="knot"></div>
		<div class="combine">
			<img src="images/bulb.png" class="bulb" alt=""/>
			<div class="wrap"><span class="flareOff"></span><span class="glowOff"></span></div>
		</div>
		<div class="cover"></div>
		<img src="images/pole.png" class="pole" alt=""/>
	</div>
<!--bulb and light end-->
</section>

<section class="blocks">
<!--edge-->
	<div class="topEdge"></div>
	<div class="bottomEdge"></div>
	<div id="buttons_2"></div>
<!--edge end-->
</section>

<section class="blocks">
	<footer id="main_footer"><p>@Zhouyang Ye 2016</p>&nbsp;&nbsp;&nbsp;<a href="http://zhouyangbt.ca" target="_self">zhouyangbt.ca</a></footer>
</section>
</body>
</html>