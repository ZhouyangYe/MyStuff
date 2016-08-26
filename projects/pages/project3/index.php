<?php
require '../../../connect.php';
require '../../../core.php';
if(!loggedin()){
	header('Location: ../../../index.php');
}else if($_SESSION['user_id']!=1){
	header('Location: ../../error_pages/no_access.html');
}
?>

<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Zhouyang Ye Project</title>
<link href="style/css.css" rel="stylesheet" />
<script type="text/javascript" src="js/main.js"></script>
</head>

<body>

<div id="top">
	<ul class="top_menu">
    	<li><a href="#">Account Sign In</a></li>
    	<li><a href="#">Register</a></li>
    	<li><a href="#">Buyers Guide</a></li>
    	<li><a href="#">About</a></li>
    	<li><a href="#">Blog</a></li>
    	<li class="no_dot"><a href="#">Contact</a></li>
    </ul>
    <ul class="top_bar">
    	<li class="phone">1(506)2928077</li>
        <li class="help"><a href="#">Live Help</a></li>
        <li class="space"><a href="#"><img src="images/top_img1.gif" alt="1" title="Canada" /></a></li>
        <li><a href="#"><img src="images/top_img2.gif" alt="2" title="US" /></a></li>
    </ul>
</div>

<div id="header">
	<div id="shopping">
    	<p>0 items in your bag</p>
        <a href="#">Check Out</a>
    </div>
	<h1 title="Ecommerce WebSite"><a href="#"><img src="images/logo.png" alt="logo" /></a></h1>
    <div class="search">
    	<form action="">
        	<input id="text1" class="text" type="text" value="Search website" />
            <input class="btn" type="submit" value="" />
        </form>
    </div>
</div>

<ul id="nav">
	<li class="active"><a href="#"><strong><span>HOME</span></strong></a></li>
	<li><a href="#"><strong><span>LATEST ARRIVALS</span></strong></a></li>
	<li><a href="#"><strong><span>MEN'S</span></strong></a></li>
	<li><a href="#"><strong><span>WOMEN'S</span></strong></a></li>
	<li><a href="#"><strong><span>KIDS</span></strong></a></li>
	<li><a href="#"><strong><span>BRANDS</span></strong></a></li>
	<li><a href="#"><strong><span>SALE</span></strong></a></li>
	<li><a href="#"><strong><span>GIFT CARDS</span></strong></a></li>
	<li><a href="#"><strong><span>FREEBIES</span></strong></a></li>
</ul>

<div id="content">
	<div id="content_top">
    	<div id="content_bottom">

            <div id="ad">
            	<a href="javascript:;" class="prev"></a>
            	<a href="javascript:;" class="next"></a>
                <span class="prev_bg"></span>
                <span class="next_bg"></span>
            	<ul>
                	<li style="opacity:1;"><a href="#a1"><img src="images/banner/1.png" alt="" /></a></li>
                	<li><a href="#a2"><img src="images/banner/2.png" alt="" /></a></li>
                	<li><a href="#a3"><img src="images/banner/3.png" alt="" /></a></li>
                </ul>
                <h2>PRODUCT TITLE</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras suscipit lacus dapibus ante mattis in adipiscing nibh placerat. Cras bibendum porta diam, non dignissim sapien malesuada vitae.</p>
                <div class="bg"></div>
            </div>
            
            <div id="main" class="clear">
            	<div id="side">
                	<div class="module_menu">
                    	<h2><strong><span>Browse Categories</span></strong></h2>
                        <div class="list">
                        	<ul>
                            	<li><a href="#">Lorem ipsum dolor sit</a></li>
                            	<li><a href="#">Amet consectetur</a></li>
                            	<li><a href="#">Adipiscin elit</a></li>
                            	<li><a href="#">Cras suscipit lacus</a></li>
                            	<li><a href="#">Dapibus ante mattis</a></li>
                            	<li><a href="#">Adipiscing nibh placerat</a></li>
                            	<li><a href="#">Cras bibendum</a></li>
                            	<li><a href="#">Porta diam elit</a></li>
                            	<li><a href="#">Adipiscing nibh placerat</a></li>
                            	<li><a href="#">Cras bibendum</a></li>
                            	<li><a href="#">Porta diam elit</a></li>                       
                            </ul>
                        </div>
                    </div>
                    
                    <div class="module_join">
                    	<div class="module_join_t">
                        	<div class="module_join_b">
                            	
                                <div class="Join_form">
                                    <p>Join our newsletter list to get the latest updates</p>
                                    <form action="#">
                                        <input type="text" class="text" />
                                        <input type="submit" value="Join Now" class="btn" />
                                    </form>
                                </div>
                                <ul class="join_list">
                                	<li class="space1">Follow us on Twitter</li>
                                    <li class="space2">Become our fan on Facebook</li>
									<li class="space3">Connect with us on LinkedIn</li>
									<li class="space3">Send us your email enquiries</li>
                                </ul>
                                
                            </div>
                        </div>
                    </div>
                    
                    <div id="payment">
                    	<img src="images/payment.gif" alt="" />
                    </div>
                    
                </div>
                
                <div id="wrap">
                	<div id="sel1" class="sort">
                    	<dl>
                        	<dt>Sotr by:</dt>
                            <dd>
                            	<h2>Ascending</h2>
                                <a href="javascript:;"></a>
                                <ul>
                                	<li>menu1</li>
                                	<li>menu2</li>
                                	<li>menu3</li>
                                </ul>
                            </dd>
                            <dd>
                            	<h2>Product Name</h2>
                                <a href="javascript:;"></a>
                                <ul>
                                	<li>menu1</li>
                                	<li>menu2</li>
                                	<li>menu3</li>
                                </ul>
                            </dd>
                            <dd>
                            	<h2>Brand Name</h2>
                                <a href="javascript:;"></a>
                                <ul>
                                	<li>menu1</li>
                                	<li>menu2</li>
                                	<li>menu3</li>
                                </ul>
                            </dd>
                        </dl>
                        <p>
                        	<strong>Items per page:</strong>
                            <span>12</span> / <span>20</span> / <span class="color_style">30</span> / <span class="color_style">50</span>
                        </p>
                    </div>
                    
                    <div class="pic_list">
                    	<h2>Our Products</h2>
                        <ul class="clear">
                        	<li>
                            	<a href="#"><img src="images/pic_list/1.jpg" alt="" /></a>
                                <h3>Product Name</h3>
                                <p>Price: <span>$12.99</span></p>
                            </li>
                        	<li>
                            	<a href="#"><img src="images/pic_list/2.jpg" alt="" /></a>
                                <h3>Product Name</h3>
                                <p>Price: <span>$12.99</span></p>
                            </li>
                        	<li>
                            	<a href="#"><img src="images/pic_list/3.jpg" alt="" /></a>
                                <h3>Product Name</h3>
                                <p>Price: <span>$12.99</span></p>
                            </li>
                        	<li>
                            	<a href="#"><img src="images/pic_list/4.jpg" alt="" /></a>
                                <h3>Product Name</h3>
                                <p>Price: <span>$12.99</span></p>
                            </li>
                        	<li>
                            	<a href="#"><img src="images/pic_list/1.jpg" alt="" /></a>
                                <h3>Product Name</h3>
                                <p>Price: <span>$12.99</span></p>
                            </li>
                        	<li>
                            	<a href="#"><img src="images/pic_list/2.jpg" alt="" /></a>
                                <h3>Product Name</h3>
                                <p>Price: <span>$12.99</span></p>
                            </li>
                        	<li>
                            	<a href="#"><img src="images/pic_list/3.jpg" alt="" /></a>
                                <h3>Product Name</h3>
                                <p>Price: <span>$12.99</span></p>
                            </li>
                        	<li>
                            	<a href="#"><img src="images/pic_list/4.jpg" alt="" /></a>
                                <h3>Product Name</h3>
                                <p>Price: <span>$12.99</span></p>
                            </li>
                        	<li>
                            	<a href="#"><img src="images/pic_list/1.jpg" alt="" /></a>
                                <h3>Product Name</h3>
                                <p>Price: <span>$12.99</span></p>
                            </li>
                        	<li>
                            	<a href="#"><img src="images/pic_list/2.jpg" alt="" /></a>
                                <h3>Product Name</h3>
                                <p>Price: <span>$12.99</span></p>
                            </li>
                        	<li>
                            	<a href="#"><img src="images/pic_list/3.jpg" alt="" /></a>
                                <h3>Product Name</h3>
                                <p>Price: <span>$12.99</span></p>
                            </li>
                        	<li>
                            	<a href="#"><img src="images/pic_list/4.jpg" alt="" /></a>
                                <h3>Product Name</h3>
                                <p>Price: <span>$12.99</span></p>
                            </li>
                        </ul>
                    </div>
                    <div class="page">
                        <a class="active" href="#">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <a href="#">4</a>
                        <a href="#">5</a>
                        <a href="#">NEXT <span>></span></a>
                        <a href="#">LAST <span>>></span></a>
                    </div>
                    
                    <div id="scroll_list">
                    	<h2>FEATURED PRODUCTS</h2>
                        <div class="scroll_wrap">
                        	<div class="scroll_wrap_l">
                            	<div id="run1" class="scroll_wrap_r">
                                	<a class="prev" href="javascript:;"></a>
                                	<a class="next" href="javascript:;"></a>
                                    <div class="list_wrap">
                                    	<ul>
                                        	<li>
                                            	<a href="#"><img src="images/scroll_pic/1.jpg" alt="" /></a>
                                                <p>Elegant MP3 player skin PSD download</p>
                                            </li>
                                        	<li>
                                            	<a href="#"><img src="images/scroll_pic/2.jpg" alt="" /></a>
                                                <p>Download shopping bag & icons (PSD & PNG)</p>
                                            </li>
                                        	<li>
                                            	<a href="#"><img src="images/scroll_pic/3.jpg" alt="" /></a>
                                                <p>High resolution abstract bokeh background</p>
                                            </li>
                                        </ul>
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

<div id="footer">
    <div id="footer_info">
        <p class="ico1">Shop online with us safely & securely</p>
        <p class="ico2">We ship your orders anywhere!</p>
        <div class="search">
            <form action="#">
                <input id="text2" class="text" type="text" value="Search website" />
                <input class="btn" type="submit" value="" />
            </form>
        </div>
    </div>
    <div id="footer_link">
    	<dl>
        	<dt>Company</dt>
            <dd><a href="#">Home</a></dd>
            <dd><a href="#">About Us</a></dd>
            <dd><a href="#">Blog</a></dd>
            <dd><a href="#">Latest News</a></dd>
            <dd><a href="#">Login</a></dd>
            <dd><a href="#">Join Us</a></dd>
        </dl>
    	<dl class="pos">
        	<dt>Categories</dt>
            <dd><a href="#">Lorem ipsum dolor sit</a></dd>
            <dd><a href="#">Amet consectetur</a></dd>
            <dd><a href="#">Adipiscin elit</a></dd>
            <dd><a href="#">Cras suscipit lacus</a></dd>
            <dd><a href="#">Dapibus ante mattis</a></dd>
            <dd><a href="#">Adipiscing nibh placerat</a></dd>
        </dl>
    	<dl>
        	<dt>Information</dt>
            <dd><a href="#">My Account</a></dd>
            <dd><a href="#">Rewards</a></dd>
            <dd><a href="#">Terms & Conditions</a></dd>
            <dd><a href="#">Buying Guide</a></dd>
            <dd><a href="#">FAQ</a></dd>
        </dl>
    	<dl>
        	<dt>Social Network</dt>
            <dd><a href="#">My Account</a></dd>
            <dd><a href="#">Rewards</a></dd>
            <dd><a href="#">Terms & Conditions</a></dd>
            <dd><a href="#">Buying Guide</a></dd>
            <dd><a href="#">FAQ</a></dd>
        </dl>
    	<dl>
        	<dt>Contact Us</dt>
            <dd><a href="#">Phone: 1.234.567.8901</a></dd>
            <dd><a href="#">Toll-Free: 1.234.567.8901</a></dd>
            <dd><a href="#">Fax: 1.234.567.8901</a></dd>
            <dd><a href="#">Email:<span>Send us an email</span></a></dd>
            <dd class="space"><a href="#">MON - SAT 9am to 7:30pm</a></dd>
            <dd><a href="#">Sundays, holidays closed</a></dd>
        </dl>
    </div>
</div>

</body>
</html>
