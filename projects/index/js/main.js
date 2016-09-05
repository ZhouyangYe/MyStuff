"use strict";
var controller = {count:((getCookie('ratio')*document.documentElement.clientHeight+1)||1),ratio:(getCookie('ratio')||0),night:false};//used to store global values.
//1.count:used to record value of window's scrollTop.
//2.ratio:used to record which part of the page the user is currently browsing.
//3.night:used to check if it's of mod night.
window.onload = function(){
	setTimeout(function(){
		document.documentElement.scrollTop = 1;
		document.body.scrollTop = 1;
	},0);
	
	//cookie for scrollTop
	(function(){
		var oScroll = 1;
		var ratio = 0;
		//alert(document.cookie);
		window.onunload = function(){
			var ratio = controller.ratio;
			setCookie('ratio',ratio,7);
		};
		//alert(document.cookie);
		function setScroll(scrollTop){
			document.documentElement.scrollTop = scrollTop;
			document.body.scrollTop = scrollTop;
		}
		if(ratio=getCookie('ratio')){
			//alert(ratio);
			setTimeout(function(){
				oScroll = ratio*document.documentElement.clientHeight+1;
				setScroll(oScroll);
			},0);
		}else{
			//alert('in');
			setTimeout(function(){
				setScroll(1);
			},0);
		}
		window.onpageshow = function(){
			if(ratio=getCookie('ratio')){
				setTimeout(function(){
					oScroll = ratio*document.documentElement.clientHeight+1;
					setScroll(oScroll);
				},0);
			}else{
				setTimeout(function(){
					setScroll(1);
				},0);
			}
			//alert('in');
			//console.log(document.body.scrollTop);
		}
	})();
	
	//the window layout and scroll
	(function(){
		var blocks = document.getElementsByClassName("blocks");
		var h = document.documentElement.clientHeight;
		if(navigator.userAgent.indexOf("Chrome") == -1&&navigator.userAgent.indexOf("Firefox") == -1){
			alert("Better to be opened on Chrome or Firefox :)");
		}
		document.addEventListener("mousemove",function(e){e.preventDefault();},false);
		document.addEventListener("mousedown",function(e){e.preventDefault();},false);
		for(var i=0;i<blocks.length;i++){//initialize the height of each block
			if(i==0){
				blocks[i].style.height = (h+1)+"px";
			}else{
				blocks[i].style.height = h+"px";
			}
		}
		window.addEventListener("resize",function(){//handle the reaction to sizes' change of each section and the scroll bar
			var height = document.documentElement.clientHeight;
			for(var i=0;i<blocks.length;i++){
				if(i==0){
					blocks[i].style.height = (height+1)+"px";
				}else{
					blocks[i].style.height = height+"px";
				}
			}
			window.removeEventListener("keyup",keyboard,false);
			window.removeEventListener("wheel",wheel,false);
			clearInterval(document.body.timer);
			clearInterval(document.documentElement.timer);
			window.addEventListener("wheel",wheel,false);
			window.addEventListener("keyup",keyboard,false);
			setTimeout(function(){
				var result = (controller.ratio*document.documentElement.clientHeight+1)||1;
				controller.count = result;
				document.documentElement.scrollTop = result;
				document.body.scrollTop = result;
			},0);
		},false);
		//handle scroll
		window.addEventListener("wheel",function(e){e.preventDefault();},false);
		window.addEventListener("keydown",function(e){
			if(e.keyCode=='40'||e.keyCode=='38'||e.keyCode=='116'){
				//console.log('in');
				e.preventDefault();
			}
		},false);
		window.addEventListener("mousedown",function(e){
			//e.preventDefault();
			if(e.clientX>=document.documentElement.clientWidth){
				clearInterval(document.body.timer);
				clearInterval(document.documentElement.timer);
				//console.log('in');
				window.removeEventListener("keyup",keyboard,false);
				window.removeEventListener("wheel",wheel,false);
				window.addEventListener("mouseup",function up(){
					window.removeEventListener("mouseup",up,false);
					//alert('in');
					resizeMove(blocks);
					//alert('scroll end');
				},false);
			}
		},false);
		window.addEventListener("wheel",wheel,false);
		window.addEventListener("keyup",keyboard,false);//handle keyboard
		var oButtons = document.getElementById('buttons');
		var aLights = oButtons.getElementsByClassName('button');
		window.addEventListener("scroll",function(){
			if(document.body.scrollTop<1&&document.documentElement.scrollTop<1){
				document.body.scrollTop = 1;
				document.documentElement.scrollTop = 1;
				//alert('in');
			}
			updateLight(aLights);
		},false);
		for(var i=0;i<aLights.length;i++){
			aLights[i].i = i;
			aLights[i].onmouseenter = function(){
				this.style.background = "#50616d";
			};
			aLights[i].onmouseleave = function(){
				if(this.active){
					this.style.background = "#50616d";
				}else{
					this.style.background = "#eee";
				}
				
			};
			aLights[i].onclick = function(){
				var height = document.documentElement.clientHeight;
				for(var j=0;j<aLights.length;j++){
					aLights[j].active = false;
				}
				this.active = true;
				window.removeEventListener("wheel",wheel,false);
				if(document.body.scrollTop){
					var scrollTop = this.i*height+1;
					startMove(document.body,{scrollTop:scrollTop},function(){
						controller.count = scrollTop;
						controller.ratio = this.i;
						window.addEventListener("wheel",wheel,false);
					});
				}else if(document.documentElement.scrollTop){
					var scrollTop = this.i*height+1;
					startMove(document.documentElement,{scrollTop:scrollTop},function(){
						controller.count = scrollTop;
						controller.ratio = this.i;
						window.addEventListener("wheel",wheel,false);
					});
				}
			};
		}
	})();
	
	//notice board
	(function(){
		var oNotice = document.getElementById('notice');
		var oH1 = oNotice.getElementsByTagName('h1')[0];
		var oP = oNotice.getElementsByTagName('p')[0];
		var oClose = oNotice.getElementsByClassName('close')[0];
		var oButton = document.getElementById('info');
		var oAbout = oButton.getElementsByTagName('h3')[0];
		var oCheck = oNotice.getElementsByTagName('input')[0];
		var oPrompt = oNotice.getElementsByClassName('prop')[0];
		var checked = getCookie('notice');
		oCheck.onmouseenter = function(){
			oPrompt.style.display = "block";
			startMove(oPrompt,{opacity:80},null,6);
		};
		oCheck.onmouseleave = function(){
			startMove(oPrompt,{opacity:0},function(){
				oPrompt.style.display = "none";
			},6);
		};
		if(checked!==undefined&&checked!==null){
			//console.log('in'+" : "+checked);
			if(checked=="true"){
				oCheck.checked = true;
			}else if(checked=="false"){
				oCheck.checked = false;
			}
			//console.log(oCheck.checked);
		}
		if(oCheck.checked){
			show();
		}else{
			oAbout.onclick = show;
		}
		window.addEventListener("unload",function(){
			setCookie('notice',oCheck.checked,7);
		},false);
		oNotice.onwheel = function(e){
			//alert('hi');
			e.cancelBubble = true;
			if(e.deltaY<0){
				oP.scrollTop -= 20;
				//console.log(oP.scrollTop);
			}else{
				oP.scrollTop += 20;
				//console.log(oP.scrollTop);
			}
			return false;
		};
		oClose.onmousedown = function(e){
			e.cancelBubble = true;
		};
		function hide(){
			oClose.onclick = null;
			oH1.className = 'contentH';
			oP.className = 'contentH';
			setTimeout(function(){
				oNotice.className = 'hidden';
			},1000);
			setTimeout(function(){
				oAbout.onclick = show;
				oAbout.style.cursor = 'pointer';
			},4000);
		}
		function show(){
			oAbout.onclick = null;
			oAbout.style.cursor = 'not-allowed';
			oNotice.className = 'visible';
			setTimeout(function(){
				oH1.className = 'contentS';
				oP.className = 'contentS';
			},3000);
			setTimeout(function(){
				oClose.onclick = hide;
			},4000);
		}
	})();
	
	//photos
	(function(){
		var data = {"title":['Neimeng','Neimeng','Neimeng','Temple','Formal'],"src":['images/pictures/photo1.jpg','images/pictures/photo2.jpg','images/pictures/photo3.jpg','images/pictures/photo4.jpg','images/pictures/photo5.jpg']};
		var oAlbum = document.getElementById('album');
		var oUl = oAlbum.getElementsByTagName('ul')[0];
		var oCover = oAlbum.getElementsByClassName('cover')[0];
		var aLi = [];
		var iNow = 0;
		for(var i=0;i<data.src.length;i++){
			var oLi = document.createElement('li');
			var oImage = document.createElement('img');
			oImage.src = data.src[i];
			oImage.alt = data.title[i];
			oLi.appendChild(oImage);
			oUl.appendChild(oLi);
			if(i==0){
				oLi.style.display = 'block';
			}
			aLi.push(oLi);
		}
		oAlbum.onmouseenter = function(){
			startMove(oCover,{"top":-586},null,6);
		};
		oAlbum.onmouseleave = function(){
			startMove(oCover,{"top":0},function(){
				iNow++;
				if(iNow>=aLi.length){
					iNow = 0;
				}
				for(var i=0;i<aLi.length;i++){
					if(i==iNow){
						aLi[i].style.display = "block";
					}else{
						aLi[i].style.display = "none";
					}
				}
			},6);
		};
	})();
	
	//folkable board
	(function(){
		var oList = document.getElementById("list");
		var aList = oList.getElementsByTagName("div");
		var oH3 = oList.getElementsByTagName('h3')[0];
		var oWrap = document.getElementById('li_wrap');
		oWrap.style.width = oH3.offsetWidth+"px";
		oWrap.style.height = (oH3.offsetHeight+60)+"px";
		doScroll(oWrap,oList,aList,oH3);
		doRotate(oWrap,oList);
	})();
	
	//bouncing board
	(function(){
		var json = {
			"title": ['AngularJS pictures','ReactJS pictures1','ReactJS pictures2','ReactJS pictures shuffling','Crowdlinker page(responsive)','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','Crowdlinker page','100Du page','Ecommerce page','Radial page','Webgl room','3D Tank','end'],
			"href": ['../angularjs/project1/index.php','../reactjs/project1/index.php','../reactjs/project2/index.php','../reactjs/project3/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','../pages/project1/index.php','../pages/project2/index.php','../pages/project3/index.php','../pages/project4/index.php','../fun/room/index.php','../fun/tank/index.php','end']
		}
		
		var oBox = document.getElementById('bWrap'); 
		var oButton = oBox.getElementsByClassName('side')[0];
		var oClose = oBox.getElementsByClassName('close')[0];
		var oUl = oBox.getElementsByTagName('ul')[0];
		var oArrow = oBox.getElementsByClassName('arrow')[0];
		oBox.speedX = 0;
		oBox.speedY = 0;
		oBox.init = true;
		oBox.mode = 'hide';
		oButton.cancelBubble = true;
		oBox.getTop = document.body.scrollTop+document.documentElement.scrollTop+60;
		//console.log(oBox.getTop);
		oBox.style.top = oBox.getTop+"px";
		doToggle(oBox,oButton,oArrow);
		doStart(oBox,oButton,oClose,oArrow);
		oClose.onmousedown = function(e){
			e.cancelBubble = true;
		};
		var total = Math.ceil(json.title.length/5);
		//alert(json.title.length);
		doPage({
			"id": 'options',
			"nowNum": 1,
			"allNum": total,
			"callBack": page_callback
		},json,oUl);
	})();
	
	//balls of pictures
	(function(){
		play();
	})();
	
	//drag second section's cover page
	(function(){
		var oButtons = document.getElementById('buttons');
		var oBlock = document.getElementsByClassName('blocks')[1];
		var oButtons_2 = document.getElementById('buttons_2');
		dragBackground(oButtons,oBlock,oButtons_2);
	})();
	
	//bulb and light
	(function(){
		var oLight = document.getElementById('light');
		var oBulb = oLight.getElementsByClassName('cover')[0];
		var oFlare = oLight.getElementsByTagName('span')[0];
		var oGlow = oLight.getElementsByTagName('span')[1];
		var aBlocks = document.getElementsByClassName('blocks');
		var oAlbum = document.getElementById('album');
		var oCover = oAlbum.getElementsByClassName('cover')[0];
		var bulb = oLight.getElementsByClassName('combine')[0];
		var oDoor = document.getElementById('door');
		var oPictures = document.getElementById('play');
		var aEdges = oDoor.getElementsByClassName('edge');
		var oContact = document.getElementById('li_wrap');
		var oInfo = document.getElementById('info');
		var oButtons = document.getElementById('buttons');
		var oMoon = document.getElementById('moon');
		var oButtons_2 = document.getElementById('buttons_2');
		var toggle = true;
		oBulb.onclick = function onOff(){
			oBulb.onclick = null;
			if(toggle){
				for(var i=0;i<aBlocks.length;i++){
					aBlocks[i].style.background = '#000';
				}
				for(var i=0;i<aEdges.length;i++){
					aEdges[i].style.boxShadow = "-2px -2px 6px #000 inset"
				}
				controller.night = true;
				oButtons_2.style.opacity = '0.6';
				oInfo.style.opacity = '0.6';
				oMoon.style.opacity = '1';
				oAlbum.style.opacity = '0.6';
				oContact.style.opacity = '0.6';
				oDoor.style.background = '#f3ea8e';
				oCover.style.background = '#080800';
				//oButtons.style.opacity = '0.6';
				startMove(oButtons,{opacity:60});
				oPictures.style.opacity = '0.9';
				oFlare.className = 'flareOn';
				oGlow.className = 'glowOn';
				oBulb.onclick = onOff;
				toggle = !toggle;
			}else{
				setTimeout(function(){
					aBlocks[0].style.background = '#fda';
					aBlocks[1].style.background = '#3eede7';
					aBlocks[2].style.background = '#f8f8f8';
					oCover.style.background = '#fda';
					oDoor.style.background = '#000';
					//oButtons.style.opacity = '1';
					startMove(oButtons,{opacity:100});
					oButtons_2.style.opacity = '1';
					oAlbum.style.opacity = '1';
					oMoon.style.opacity = '0.4';
					oPictures.style.opacity = '1';
					oInfo.style.opacity = '1';
					oContact.style.opacity = '1';
					for(var i=0;i<aEdges.length;i++){
						aEdges[i].style.boxShadow = "2px 2px 6px #000 inset";
					}
					oBulb.onclick = onOff;
				},788);
				controller.night = false;
				oFlare.className = 'flareOff';
				oGlow.className = 'glowOff';
				toggle = !toggle;
			}
		};
		/*function swing(){
			oBulb.onmouseenter = null;
			bulb.className = "combine swing";
			setTimeout(function(){
				bulb.className = "combine";
				oBulb.onmouseenter = swing;
			},1800);
		}*/
		var toggleL = true;
		var toggleR = true;
		var left = getLeft(bulb);
		function swing(e){
			//document.title = e.clientX+" : "+(getLeft(bulb)+15);
			if(e.clientX>(left+15)){
				if(toggleL){
					bulb.className = "combine swingl1";
					toggleL = !toggleL;
				}else{
					bulb.className = "combine swingl2";
					toggleL = !toggleL;
				}
			}else{
				if(toggleR){
					bulb.className = "combine swingr1";
					toggleR = !toggleR;
				}else{
					bulb.className = "combine swingr2";
					toggleR = !toggleR;
				}
			}
		}
		oBulb.onmouseenter = swing;
	})();
};

function getLeft(obj){
	var left = 0;
	while(obj){
		left += obj.offsetLeft;
		obj = obj.offsetParent;
		//console.log(left);
	}
	return left;
}

function updateLight(aLights){
	for(var i=0;i<aLights.length;i++){
		var height = document.documentElement.clientHeight;
		var scrollTop = document.body.scrollTop+document.documentElement.scrollTop;
		if(scrollTop>=(i*height+1)&&scrollTop<(i*height+1+height/2)){
			for(var j=0;j<aLights.length;j++){
				aLights[j].style.background = "#eee";
				aLights[j].active = false;
			}
			aLights[i].style.background = "#50616d";
			aLights[i].active = true;
		}else if(scrollTop>=(i*height+1+height/2)&&scrollTop<(i*height+1+height)){
			for(var j=0;j<aLights.length;j++){
				aLights[j].style.background = "#eee";
				aLights[j].active = false;
			}
			if((i+1)<aLights.length){
				//console.log('in');
				aLights[i+1].style.background = "#50616d";
				aLights[i].active = true;
			}
		}
	}
}

function resizeMove(blocks){
	//alert('in');
	if(document.body.scrollTop < 1&&document.documentElement.scrollTop < 1){
		document.body.scrollTop = 1;
		document.documentElement.scrollTop = 1;
		//alert('in');
	}
	var height = document.documentElement.clientHeight;
	var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
	for(var i=0;i<blocks.length;i++){
		if(scrollTop>=(i*height+1)&&scrollTop<(i*height+1+height/2)){
			//alert('in');
			if(document.body.scrollTop){
				var scrollT = i*height+1;
				startMove(document.body,{scrollTop:scrollT},function(){
					window.addEventListener("wheel",wheel,false);
					window.addEventListener("keyup",keyboard,false);
					controller.count = document.documentElement.scrollTop + document.body.scrollTop;
					controller.ratio = Math.round((controller.count-1)/document.documentElement.clientHeight);
					//console.log(controller.count);
				});
			}else if(document.documentElement.scrollTop){
				var scrollT = i*height+1;
				startMove(document.documentElement,{scrollTop:scrollT},function(){
					window.addEventListener("wheel",wheel,false);
					window.addEventListener("keyup",keyboard,false);
					controller.count = document.documentElement.scrollTop + document.body.scrollTop;
					controller.ratio = Math.round((controller.count-1)/document.documentElement.clientHeight);
				});
			}
		}else if(scrollTop>=(i*height+1+height/2)&&scrollTop<(i*height+1+height)){
			if(document.body.scrollTop){
				var scrollT = i*height+1+height;
				startMove(document.body,{scrollTop:scrollT},function(){
					window.addEventListener("wheel",wheel,false);
					window.addEventListener("keyup",keyboard,false);
					controller.count = document.documentElement.scrollTop + document.body.scrollTop;
					controller.ratio = Math.round((controller.count-1)/document.documentElement.clientHeight);
				});
				
			}else if(document.documentElement.scrollTop){
				var scrollT = i*height+1+height;
				startMove(document.documentElement,{scrollTop:scrollT},function(){
					window.addEventListener("wheel",wheel,false);
					window.addEventListener("keyup",keyboard,false);
					controller.count = document.documentElement.scrollTop + document.body.scrollTop;
					controller.ratio = Math.round((controller.count-1)/document.documentElement.clientHeight);
				});
			}
		}
	}
}

function keyboard(e){
	var keyCode = e.keyCode;
	//console.log('in');
	//alert("hello");
	if(document.body.scrollTop < 1&&document.documentElement.scrollTop < 1){
		document.body.scrollTop = 1;
		document.documentElement.scrollTop = 1;
	}
	var callee = wheel;
	var height = document.documentElement.clientHeight;
	if(keyCode=='38'){
		//alert('in');
		if(controller.count>=height){
			controller.count -= height;
			controller.ratio = Math.round((controller.count-1)/document.documentElement.clientHeight);
		}else{
			controller.count = 1;
			controller.ratio = 0;
		}
	}else if(keyCode=='40'){
		if(controller.count<=(document.body.offsetHeight-2*height)){
			controller.count += height;
			controller.ratio = Math.round((controller.count-1)/document.documentElement.clientHeight);
		}else{
			controller.count = document.body.offsetHeight-height;
			controller.ratio = Math.round((controller.count-1)/document.documentElement.clientHeight);
		}
	}
	if(keyCode=='38'||keyCode=='40'){
		window.removeEventListener("wheel",callee,false);
		if(document.body.scrollTop){
			startMove(document.body,{scrollTop:controller.count},function(){
				window.addEventListener("wheel",callee,false);
			},6);
		}else if(document.documentElement.scrollTop){
			startMove(document.documentElement,{scrollTop:controller.count},function(){
				window.addEventListener("wheel",callee,false);
			},6);
		}
	}
	//console.log(controller.count);
}

function wheel(e){
	//alert('in');
	if(document.body.scrollTop < 1&&document.documentElement.scrollTop < 1){
		document.body.scrollTop = 1;
		document.documentElement.scrollTop = 1;
	}
	var callee = wheel;
	window.removeEventListener("wheel",callee,false);
	var height = document.documentElement.clientHeight;
	var currentY = document.documentElement.scrollTop + document.body.scrollTop;
	if(e.deltaY<0){
		//alert('in');
		if(currentY>=height){
			currentY -= height;
		}else{
			currentY = 1;
		}
	}else{
		if(currentY<=(document.body.offsetHeight-2*height)){
			currentY += height;
		}else{
			currentY = document.body.offsetHeight-height;
		}
	}
	
	if(document.body.scrollTop){
		startMove(document.body,{scrollTop:currentY},function(){
			controller.count = currentY;
			controller.ratio = Math.round((controller.count-1)/document.documentElement.clientHeight);
			window.addEventListener("wheel",callee,false);
		},6);
	}else if(document.documentElement.scrollTop){
		startMove(document.documentElement,{scrollTop:currentY},function(){
			controller.count = currentY;
			controller.ratio = Math.round((controller.count-1)/document.documentElement.clientHeight);
			window.addEventListener("wheel",callee,false);
		},6);
	}
	//console.log(document.documentElement.scrollTop);
}

function doScroll(oWrap,oList,aList,oH3){
	var length = aList.length;
	var index = -1;
	var oTimer = null;
	oList.onmouseenter = function(){
		//console.log('in');
		oWrap.style.height = (aList.length*(aList[0].offsetHeight+4)+oH3.offsetHeight+30)+"px";
		if(oTimer){
			clearInterval(oTimer);
		}
		if(index<0){
			index = 0;
		}
		oTimer = setInterval(function(){
			if(index == length){
				clearInterval(oTimer);
				//console.log('stopped5');
				oTimer = null;
			}else{
				aList[index].className = "show";
				aList[index].onmouseover = function(e){
					e.cancelBubble = true;
					this.style.background = "rgba(255,188,188,0.9)";
				}
				aList[index].onmouseout = function(e){
					e.cancelBubble = true;
					this.style.background = "rgba(255,255,255,0.9)";
				}
				index++;
			}
		},160);
	};
	
	oWrap.addEventListener("mouseleave",function(){
		oWrap.style.height = (oH3.offsetHeight+60)+"px";
		if(oTimer){
			clearInterval(oTimer);
			//alert('yea');
			oTimer = null;
		}
		if(index>=length){
			index = length-1;
		}
		oTimer = setInterval(function(){
			if(index < 0){
				clearInterval(oTimer);
				//console.log('stopped4');
				oTimer = null;
			}else{
				aList[index].onmouseover = null;
				aList[index].onmouseout = null;
				aList[index].className = "hide";
				index--;
			}
		},160);
	},false);
}

function doRotate(oWrap,oList){
	oWrap.onmouseenter = function(){
		oWrap.onmousemove = function(ev){
			ev = ev||window.event;
			var l = ev.clientX - oWrap.offsetLeft;
			var width = oWrap.clientWidth;
			var p = (l - width/2)/width;
			var deg = 60*p;
			//document.title = deg;
			oList.style.cssText = "transform:rotateY("+deg+"deg);transition:transform 0.2s ease;";
		}
	};
	oWrap.addEventListener("mouseleave",function(){
		oWrap.onmousemove = null;
		setTimeout(function(){
			oList.style.cssText = "transform:rotateY("+0+"deg);transition:transform 1.2s ease;";
		},1000);
	},false);
}

function doToggle(oBox,oButton,oArrow){
	if(oBox.mode=='hide'){
		oButton.onmouseenter = function(){
			oBox.style.boxShadow = "none";
			oArrow.style.display = "none";
			startMove(oBox,{left:-300});
		};
		oButton.onmouseleave = function(){
			oArrow.style.display = "block";
			startMove(oBox,{left:-320});
		};
	}else if(oBox.mode=='show'){
		oArrow.style.display = "none";
		oButton.onmouseenter = null;
		oButton.onmouseleave = null;
	}
}

function doDrag(oBox){
	if(oBox.mode=='hide'){
		oBox.onmousedown = null;
		return;
	}
	oBox.onmousedown = function(e){
		clearInterval(oBox.timer);
		e = e||window.event;
		var xPrev = e.clientX;
		var yPrev = e.pageY;
		var iLeft = e.clientX - oBox.offsetLeft;
		var iTop = e.pageY - oBox.offsetTop;
		var leftMost = document.documentElement.clientWidth-oBox.offsetWidth;
		var topMost = document.documentElement.clientHeight+document.body.scrollTop+document.documentElement.scrollTop-oBox.offsetHeight;
		document.onmousemove = function(ev){
			var xDis = ev.clientX-xPrev;
			var yDis = ev.pageY-yPrev;
			xPrev = ev.clientX;
			yPrev = ev.pageY;
			oBox.speedX = Math.ceil(2*xDis);
			oBox.speedY = Math.ceil(2*yDis);
			var l = ev.clientX-iLeft;
			var t = ev.pageY-iTop;
			l=l<0?0:l;
			t=t<0?0:t;
			l=l>leftMost?leftMost:l;
			t=t>topMost?topMost:t;
			oBox.style.left = l+"px";
			oBox.style.top = t+"px";
			return false;
		};
		document.onmouseup = function(){
			document.onmouseup = null;
			document.onmousemove = function(e){
				e = e||window.event;
				e.preventDefault();
				return false;
			};
			doBounce(oBox);
		};
		return false;
	};
}

function doBounce(oBox){
	if(oBox.mode=='hide'){
		clearInterval(oBox.timer);
		return;
	}
	var l = oBox.offsetLeft;
	var t = oBox.offsetTop;
	var leftMost = document.documentElement.clientWidth-oBox.offsetWidth;
	var topMost = document.documentElement.clientHeight+document.documentElement.scrollTop+document.body.scrollTop-oBox.offsetHeight;
	//alert(oBox.getTop);
	var gravity = 3;
	clearInterval(oBox.timer);
	oBox.timer = setInterval(function(){
		oBox.speedY += gravity;
		l += oBox.speedX;
		t += oBox.speedY;
		l=l<0?0:l;
		t=t<0?0:t;
		l=l>leftMost?leftMost:l;
		t=t>topMost?topMost:t;
		if(l==0||l==leftMost){
			oBox.speedX *= -0.8;
		}
		if(t==0||t==topMost){
			oBox.speedY *= -0.8;
			oBox.speedX *= 0.8;
		}
		if(Math.abs(oBox.speedX)<1){
			oBox.speedX = 0;
		}
		if(Math.abs(oBox.speedY)<1){
			oBox.speedY = 0;
		}
		if(t==topMost&&oBox.speedY==0&&oBox.speedX==0){
			clearInterval(oBox.timer);
			//document.title += 1;
			//console.log(t+" : "+(document.documentElement.clientHeight+document.documentElement.scrollTop+document.body.scrollTop-oBox.offsetHeight));
			//console.log('stopped1');
		}
		oBox.style.left = l+"px";
		oBox.style.top = t+"px";
	},30);
}

function doStart(oBox,oButton,oClose,oArrow){
	clearInterval(oBox.timer);
	if(oBox.mode=='hide'){
		oButton.onclick = function(){
			if(oBox.init){
				oBox.init = false;
			}
			oBox.style.boxShadow = "0 0 10px #888";
			oButton.onclick = null;
			oBox.mode = 'show';
			doStart(oBox,oButton,oClose,oArrow);
		}
		if(oBox.init){
			window.onscroll = function(){
				oBox.getTop = document.body.scrollTop+document.documentElement.scrollTop+60;
				startMove(oBox,{"top":oBox.getTop});
			};
		}
		if(!oBox.init){
			doDrag(oBox);
			doBounce(oBox);
			window.onresize = null;
			window.onscroll = function(){
				oBox.getTop = document.body.scrollTop+document.documentElement.scrollTop+60;
			};
			var oCover = oBox.getElementsByClassName('cover')[0];
			var oImage = oBox.getElementsByTagName('img')[0];
			oCover.style.display = "block";
			var edge = 40;
			var width = oBox.offsetWidth;
			var bLeft = oBox.offsetLeft+(width-edge)/2;
			var bTop = oBox.offsetTop+(width-edge)/2;
			startMove(oBox,{"width":edge,"height":edge,"left":bLeft,"top":bTop,"opacity":20},function(){
				startMove(oBox,{"top":(oBox.getTop+84),"left":-50},function(){
					oBox.style.cssText = "width:300px;height:300px;top:"+oBox.getTop+"px;left:-320px;";
					oCover.style.display = "none";
					oButton.style.display = "block";
					doToggle(oBox,oButton,oArrow);
					oArrow.style.display = "block";
					window.onscroll = function(){
						oBox.getTop = document.body.scrollTop+document.documentElement.scrollTop+60;
						startMove(oBox,{"top":oBox.getTop});
					};
				});
			});
		}
	}else if(oBox.mode=='show'){
		oClose.onclick = function(){
			oClose.onclick = null;
			oBox.mode = 'hide';
			doStart(oBox,oButton,oClose,oArrow);
		}
		doToggle(oBox,oButton,oArrow);
		window.onresize = null;
		window.onscroll = function(){
			oBox.getTop = document.body.scrollTop+document.documentElement.scrollTop+60;
		};
		var l = oBox.offsetLeft;
		oBox.speedX = 0;
		var accelor = 0.05;
		
		var obj = oButton;
		var arr = [];
		var num = 0;
		var bTop = oButton.offsetTop;
		for(var i=10;i>=0;i-=1){
			arr.push(i,-i);
		}
		clearInterval(obj.shake);
		obj.shake = setInterval(function(){
			if(num==arr.length){
				clearInterval(obj.shake);
				//console.log('stopped2');
				startMove(oButton,{"opacity":0},function(){
					oButton.style.display = "none";
					oButton.style.opacity = "1";
					clearInterval(oBox.timer);
					oBox.timer = setInterval(function(){
						if(oBox.offsetLeft>0){
							clearInterval(oBox.timer);
							//console.log('stopped3');
							doDrag(oBox);
							doBounce(oBox);
							window.onresize = function(){
								doBounce(oBox);
							};
							window.onscroll = function(){
								oBox.getTop = document.body.scrollTop+document.documentElement.scrollTop+60;
								doBounce(oBox);
							}
						}
						oBox.speedX += accelor;
						l += oBox.speedX;
						oBox.style.left = l+"px";
					},20);
				});
			}else{
				obj.style.top = (bTop+arr[num])+"px";
				num++;
			}
		},30);
	}
}

//slide pictures
function play(){
	var oPlay = document.getElementById('play');
	var oPrev = oPlay.getElementsByClassName('prev')[0];
	var oNext = oPlay.getElementsByClassName('next')[0];
	var aLi = oPlay.getElementsByTagName('li');
	//alert(aLi.length);
	
	var info = [];
	info.push('middle');
	info.push('left');
	info.push('right');
	
	oPrev.onclick = fn_prev;
	oNext.onclick = fn_next;
	
	function fn_prev(){
		oPrev.onclick = null;
		oNext.onclick = null;
		info.push(info.shift());
		for(var i=0;i<aLi.length;i++){
			aLi[i].className = info[i];
		}
		setTimeout(function(){
			oPrev.onclick = fn_prev;
			oNext.onclick = fn_next;
		},1000);
	};
	
	function fn_next(){
		oPrev.onclick = null;
		oNext.onclick = null;
		info.unshift(info.pop());
		for(var i=0;i<aLi.length;i++){
			aLi[i].className = info[i];
		}
		setTimeout(function(){
			oPrev.onclick = fn_prev;
			oNext.onclick = fn_next;
		},1000);
	};
}

function doPage(json,data,oUl){
	if(!json.id){return false};
	var obj = document.getElementById(json.id);
	var nowNum = json.nowNum || 1;
	var allNum = json.allNum || 5;
	var callBack = json.callBack || function(){};
	var oA = document.createElement('a');
	if(nowNum>=2){
		oA.href = '#'+(nowNum-1);
	}else{
		oA.href = '#'+1;
	}
	oA.innerHTML = 'prev';
	obj.appendChild(oA);
	if(allNum<=5){
		for(var i=1;i<=allNum;i++){
			var oA = document.createElement('a');
			oA.href = '#'+i;
			if(nowNum == i){
				oA.innerHTML = i;
			}
			else{
				oA.innerHTML = '['+i+']';
			}
			obj.appendChild(oA);
		}	
	}
	else{
		for(var i=1;i<=5;i++){
			var oA = document.createElement('a');
			if(nowNum == 1 || nowNum == 2){
				oA.href = '#'+i;
				if(nowNum == i){
					oA.innerHTML = i;
				}
				else{
					oA.innerHTML = '['+i+']';
				}
			}
			else if( (allNum-nowNum) == 0 || (allNum-nowNum) == 1 ){
				oA.href = '#'+(allNum-5+i);
				if((allNum-nowNum)==0 && i==5){
					oA.innerHTML = (allNum-5+i);
				}
				else if((allNum-nowNum) == 1 && i==4){
					oA.innerHTML = (allNum-5+i);
				}
				else{
					oA.innerHTML = '['+(allNum-5+i)+']';
				}
			}
			else{
				oA.href = '#'+(nowNum-3+i);
				if(i==3){
					oA.innerHTML = (nowNum-3+i);
				}
				else{
					oA.innerHTML = '['+(nowNum-3+i)+']';
				}
			}
			obj.appendChild(oA);
		}
	}
	var oA = document.createElement('a');
	if( (allNum-nowNum)>=1 ){
		oA.href = '#'+(nowNum+1);
	}else{
		oA.href = '#'+nowNum;
	}
	oA.innerHTML = 'next';
	obj.appendChild(oA);
	callBack(nowNum,data,oUl);
	var aA = obj.getElementsByTagName('a');
	for(var i=0;i<aA.length;i++){
		aA[i].onclick = function(e){
			var nowNum = parseInt(this.getAttribute('href').substring(1));
			obj.innerHTML = '';
			doPage({
				"id" : json.id,
				"nowNum" : nowNum,
				"allNum" : allNum,
				"callBack" : callBack
			},data,oUl);
			e.preventDefault();
			return false;
		};
	}
}

function page_callback(nowPage,data,oUl){
	var num = nowPage*5<data.title.length?5:data.title.length-(nowPage-1)*5;
	if(oUl.innerHTML == ''){
		for(var i=0;i<5;i++){
			var oLi = document.createElement('li');
			var oA = document.createElement('a');
			var oAb = document.createElement('a');
			var oDiv = document.createElement('div');
			if(i>=num){
				oA.setAttribute('href','javascript:;');
				oA.innerHTML = '';
				
			}else{
				oA.setAttribute('href',data.href[(nowPage-1)*5+i]);
				oA.innerHTML = data.title[(nowPage-1)*5+i];
			}
			oDiv.appendChild(oAb);
			oDiv.appendChild(oA);
			oLi.appendChild(oDiv);
			oUl.appendChild(oLi);
			oDiv.style.top = (-oLi.offsetHeight)+'px';
		}
	}else{
		var aLi = oUl.getElementsByTagName('li');
		var height = aLi[0].offsetHeight;
		var currentLi = 0;
		clearInterval(oUl.timer);
		//alert(aLi.length);
		for(var i=0;i<5;i++){
			var oDiv = aLi[i].getElementsByTagName('div')[0];
			var aA = oDiv.getElementsByTagName('a');
			if(i>=num){
				aA[0].setAttribute('href','javascript:;');
				aA[0].innerHTML = '';
			}else{
				oDiv.style.top = (-height)+'px';
				aA[0].setAttribute('href',data.href[(nowPage-1)*5+i]);
				aA[0].innerHTML = data.title[(nowPage-1)*5+i];
			}
		}
		oUl.timer = setInterval(function(){
			if(currentLi>=5){
				clearInterval(oUl.timer);
				currentLi = 0;
			}else{
				startMove(aLi[currentLi].getElementsByTagName('div')[0],{"top":0},function(){
					var aA = this.getElementsByTagName('a');
					aA[1].setAttribute('href',aA[0].getAttribute('href')); 
					aA[1].setAttribute('target',aA[0].getAttribute('target'));
					aA[1].innerHTML = aA[0].innerHTML;
					this.style.top = (-height)+"px";
				});
				currentLi++;
			}
		},100);
	}
}

function dragBackground(oButtons,oBlock,oButtons_2){
	var init = oButtons_2.offsetLeft;
	oBlock.leftPrev = 0;
	var t = (oButtons.offsetTop+document.body.scrollTop+document.documentElement.scrollTop)%5;
	var l = (oButtons.offsetLeft+oBlock.offsetLeft)%5;
	oButtons.style.backgroundPosition = (-l+1)+"px "+(-t+1)+"px";
	window.addEventListener("scroll",function(){
		if(oBlock.offsetLeft<0){
			startMove(oBlock,{left:-(document.documentElement.clientWidth-249)},function(){
				setTimeout(function(){
					var t = (oButtons_2.offsetTop+document.body.scrollTop+document.documentElement.scrollTop)%5;
					var l = (oButtons_2.offsetLeft+oBlock.offsetLeft)%5;
					oButtons_2.style.backgroundPosition = (-l+1)+"px "+(-t+1)+"px";
					//console.log(t+" : "+l+" : "+oButtons_2.offsetTop+" : "+oBlock.offsetLeft);
				},0);
			});
		}else{
			setTimeout(function(){
				var t = (oButtons.offsetTop+document.body.scrollTop+document.documentElement.scrollTop)%5;
				var l = (oButtons.offsetLeft+oBlock.offsetLeft)%5;
				oButtons.style.backgroundPosition = (-l+1)+"px "+(-t+1)+"px";
				//console.log(t+" : "+l+" : "+oButtons_2.offsetTop+" : "+oBlock.offsetLeft);
			},0);
		}
	},false);
	window.addEventListener("resize",function(){
		if(oBlock.offsetLeft<0){
			startMove(oBlock,{left:-(document.documentElement.clientWidth-249)},function(){
				setTimeout(function(){
					var t = (oButtons_2.offsetTop+document.body.scrollTop+document.documentElement.scrollTop)%5;
					var l = (oButtons_2.offsetLeft+oBlock.offsetLeft)%5;
					//console.log(t+" : "+l+" : "+oButtons_2.offsetTop+" : "+oBlock.offsetLeft);
					oButtons_2.style.backgroundPosition = (-l+1)+"px "+(-t+1)+"px";
				},0);
			});
		}else{
			setTimeout(function(){
				var t = (oButtons.offsetTop+document.body.scrollTop+document.documentElement.scrollTop)%5;
				var l = (oButtons.offsetLeft+oBlock.offsetLeft)%5;
				oButtons.style.backgroundPosition = (-l+1)+"px "+(-t+1)+"px";
				//console.log(t+" : "+l+" : "+oButtons_2.offsetTop+" : "+oBlock.offsetLeft);
			},0);
		}
	},false);
	function drag(ev){
		//console.log(leftPrev);
		var diff = ev.clientX-oBlock.leftPrev;
		var result = oBlock.left+diff;
		result = result<-document.documentElement.clientWidth?-document.documentElement.clientWidth:result;
		result = result>0?0:result;
		oBlock.style.left = result+"px";
		var t = (oButtons_2.offsetTop+document.body.scrollTop+document.documentElement.scrollTop)%5;
		var l = (oButtons_2.offsetLeft+oBlock.offsetLeft)%5;
		oButtons_2.style.backgroundPosition = (-l+1)+"px "+(-t+1)+"px";
		//console.log(t+" : "+l+" : "+oButtons_2.offsetTop+" : "+oBlock.offsetLeft);
	}
	function reSet(){
		window.removeEventListener("scroll",reSet,false);
		clearInterval(oButtons.timer);
		if(controller.night){
			oButtons.style.opacity = '0.6';
		}else{
			oButtons.style.opacity = '1';
		}
		oButtons_2.style.display = 'none';
		window.addEventListener("keyup",keyboard,false);
		window.addEventListener("wheel",wheel,false);
		oBlock.addEventListener("mousedown",oBlock.ftn,false);
	}
	oBlock.addEventListener("mousedown",function handleMouseDown(e){
		//alert('in');
		oBlock.ftn = handleMouseDown;
		oBlock.leftPrev = e.clientX;
		oBlock.left = oBlock.offsetLeft;
		var scrollTop = document.documentElement.scrollTop+document.body.scrollTop;
		if(scrollTop==(document.documentElement.clientHeight+1)){
			//console.log('in');
			window.removeEventListener("keyup",keyboard,false);
			window.removeEventListener("wheel",wheel,false);
			oButtons_2.style.display = 'block';
			var t = (oButtons_2.offsetTop+document.body.scrollTop+document.documentElement.scrollTop)%5;
			var l = (oButtons_2.offsetLeft+oBlock.offsetLeft)%5;
			oButtons_2.style.backgroundPosition = (-l+1)+"px "+(-t+1)+"px";
			//console.log(t+" : "+l+" : "+oButtons_2.offsetLeft+" : "+oBlock.offsetLeft);
			clearInterval(this.timer);
			//console.log('s');
			clearInterval(oButtons.timer);
			oButtons.style.opacity = '0';
			oButtons.style.display = 'none';
			function cancel(){
				//console.log('in');
				if(oBlock.offsetLeft<-(document.documentElement.clientWidth/2)){
					startMove(oBlock,{left:-(document.documentElement.clientWidth-249)},function(){
						window.addEventListener("keyup",keyboard,false);
						window.addEventListener("wheel",wheel,false);
						var t = (oButtons_2.offsetTop+document.body.scrollTop+document.documentElement.scrollTop)%5;
						var l = (oButtons_2.offsetLeft+oBlock.offsetLeft)%5;
						oButtons_2.style.backgroundPosition = (-l+1)+"px "+(-t+1)+"px";
						//console.log(t+" : "+l+" : "+oButtons_2.offsetLeft+" : "+oBlock.offsetLeft);
					});
				}else{
					var op = 100;
					startMove(oBlock,{left:0},function(){
						oBlock.removeEventListener("mousedown",handleMouseDown,false);
						oButtons.style.display = 'block';
						if(controller.night){
							op = 0;
						}else{
							op = 100;
						}
						var t = (oButtons.offsetTop+document.body.scrollTop+document.documentElement.scrollTop)%5;
						var l = (oButtons.offsetLeft+oBlock.offsetLeft)%5;
						oButtons.style.backgroundPosition = (-l+1)+"px "+(-t+1)+"px";
						//console.log(t+" : "+l+" : "+oButtons.offsetLeft+" : "+oBlock.offsetLeft);
						window.addEventListener("scroll",reSet,false);
						startMove(oButtons,{opacity:op},function(){
							window.removeEventListener("scroll",reSet,false);
							window.addEventListener("keyup",keyboard,false);
							oButtons_2.style.display = 'none';
							if(controller.night){
								oButtons.style.opacity = '0.6';
							}
							window.addEventListener("wheel",wheel,false);
							oBlock.addEventListener("mousedown",handleMouseDown,false);
						},8);
						var sTop = document.documentElement.scrollTop+document.body.scrollTop;
					});
				}
				window.removeEventListener('mousemove',drag,false);
				window.removeEventListener('mouseup',cancel,false);
			}
			window.removeEventListener('mousemove',drag,false);
			window.addEventListener('mousemove',drag,false);
			window.removeEventListener('mouseup',cancel,false);
			window.addEventListener('mouseup',cancel,false);
		}
	},false);
}




















