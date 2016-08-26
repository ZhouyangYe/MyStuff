window.onload = function(){
	yzy.app.toRun();
	yzy.app.toBox();
	yzy.app.toBanner();
	yzy.app.nav();
};

var yzy = {};

//tools 
yzy.tools = {};

yzy.tools.getByClass = function(oParent,sClass){
	var aEle = oParent.getElementsByTagName('*');
	var arr = [];
	
	for(var i=0;i<aEle.length;i++){
		if(aEle[i].className == sClass){
			arr.push(aEle[i]);
		}
	}
	
	return arr;
};

yzy.tools.getStyle = function(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,false)[attr];
	}
};

//ui
yzy.ui ={};

yzy.ui.expand = function(obj,height){
	//alert(height);
	clearInterval(obj.timer);
	var v = 0;
	var h = obj.offsetHeight;
	obj.timer = setInterval(function(){
		if(h==height){
			//alert('y');
			clearInterval(obj.timer);
		}else{
			v = height-h>0?Math.ceil((height-h)/3):Math.floor((height-h)/3);
			h += v;
			//console.log(h);
			obj.style.height = h + 'px';
		}
		
	},30);
}

yzy.ui.textChange = function(obj,str){
	
	obj.onfocus = function(){
		if(this.value == str){
			this.value = '';
		}
	};
	
	obj.onblur = function(){
		if(this.value == ''){
			this.value = str;
		}
	};
	
};

yzy.ui.fadeIn = function(obj){
	
	var iCur = yzy.tools.getStyle(obj,'opacity');
	if(iCur==1){ return false; }
	
	var value = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iSpeed = 5;
		if(value == 100){
			clearInterval(obj.timer);
		}
		else{
			value += iSpeed;
			obj.style.opacity = value/100;
		}
	},30);
	
};

yzy.ui.fadeOut = function(obj){
	
	var iCur = yzy.tools.getStyle(obj,'opacity');
	if(iCur==0){ return false; }
	
	var value = 100;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iSpeed = -5;
		if(value == 0){
			clearInterval(obj.timer);
		}
		else{
			value += iSpeed;
			obj.style.opacity = value/100;
		}
	},30);
	
};


//app
yzy.app = {};
yzy.app.toRun = function(){
	var iNow = 0;
	var oScrollbar = document.getElementById('scrollbar');
	var oP = oScrollbar.getElementsByTagName('p');
	//var cloneS = oScrollbar
	
	yzy.app.roll(iNow,oScrollbar,oP);
}

yzy.app.move = function(obj,old,now,width,iNow,oP){
	clearInterval(obj.timer);
	obj.old = old;
	obj.now = now;
	obj.timer = setInterval(function(){
		
		var iSpeed = (now - old)/500;
		iSpeed = Math.floor(iSpeed);
		
		if(now == old){
			clearInterval(obj.timer);
		}
		else{
			old += iSpeed;
			obj.onmouseover=function(){obj.trigger = 's';obj.old=old;}
			obj.onmouseout=function(){obj.trigger = 'go';old=obj.old;}
			if(obj.trigger=='s'){
				obj.style.left = obj.old + 'px';
			}else{
				obj.style.left = old + 'px';
			}
			//console.log(obj.style.left);
			if(obj.style.left==-width+10+'px'){	
				//console.log('yes');
				oP[iNow].style.display = 'none';
				iNow++;
				if(iNow>oP.length-1){
					iNow = 0;	
				}
				obj.style.left = 520 + 'px';
				yzy.app.roll(iNow,obj,oP);
			}
		}
	},30);
	
};

yzy.app.roll = function(iNow,oScrollbar,oP){
	oP[iNow].style.display = 'inline-block';
	oScrollbar.style.width = oP[iNow].offsetWidth + 10 + 'px';
	var width = oScrollbar.offsetWidth;
	//console.log(width);
	yzy.app.move(oScrollbar,520,-oP[iNow].offsetWidth,width,iNow,oP);
	//console.log(width);
}

yzy.app.toBox = function(){
	var texts = document.getElementsByClassName('box');
	for(var i=0;i<texts.length-1;i++){
		yzy.ui.textChange(texts[i],'Email (required)');
	}
	yzy.ui.textChange(texts[2],'Message (required)');
	
};

yzy.app.toBanner = function(){
	var oDd = document.getElementById('header');
	var aLi = oDd.getElementsByTagName('li');
	
	//console.log(aLi.length);
	
	var oPrev = yzy.tools.getByClass(oDd,'l_btn')[0];
	var oNext = yzy.tools.getByClass(oDd,'r_btn')[0];
	
	var iNow = 0;
	
	var timer = setInterval(auto,3000);
	
	function auto(){
		
		if(iNow == aLi.length-1){
			iNow = 0;
		}
		else{
			iNow++;
		}
		
		for(var i=0;i<aLi.length;i++){
			yzy.ui.fadeOut(aLi[i]);
		}
		
		yzy.ui.fadeIn(aLi[iNow]);
		
	}
	
	function autoPrev(){
		
		if(iNow == 0){
			iNow = aLi.length-1;
		}
		else{
			iNow--;
		}
		
		for(var i=0;i<aLi.length;i++){
			yzy.ui.fadeOut(aLi[i]);
		}
		
		yzy.ui.fadeIn(aLi[iNow]);
		
	}
	
	for(var i=0;i<aLi.length;i++){
		aLi[i].onmouseenter = function(){
			//console.log('in');
			clearInterval(timer);
		};
	
		aLi[i].onmouseleave = function(){
			//console.log('out');
			timer = setInterval(auto,3000);
		};
	}
	
	
	oPrev.onclick = function(){
		autoPrev();
	};
	
	oPrev.onmouseenter = function(){
		//console.log('in');
		clearInterval(timer);
	}
	
	oPrev.onmouseleave = function(){
		timer = setInterval(auto,3000);
	}
	
	oNext.onclick = function(){
		auto();
	};
	
	oNext.onmouseenter = function(){
		clearInterval(timer);
	}
	
	oNext.onmouseleave = function(){
		timer = setInterval(auto,3000);
	}
}

yzy.app.nav = function(){
	var oWrapper = document.getElementById('top_wrapper');
	var oDl = oWrapper.getElementsByTagName('dl')[0];
	var aNav = yzy.tools.getByClass(oDl,'nav');
	var aUl = oDl.getElementsByTagName('ul');
	var obj = null;
	for(var i=0;i<aNav.length;i++){
		aNav[i].i=i;
		aNav[i].onmouseover = function(e){
			//alert(i);
			obj = e.toElement || e.target;
			//alert(obj);
			for (var j=0;j<aUl.length;j++){
				//alert(obj.i);
				if(j==obj.i){
					clearTimeout(aUl[j].delay);
					var aLi = aUl[j].getElementsByTagName('li');
					aUl[j].height = aLi[0].offsetHeight*aLi.length;
					//alert(height);
					yzy.ui.expand(aUl[j],aUl[j].height);
				}else{
					clearInterval(aUl[j].timer);
					aUl[j].style.height = '0';
				}
			}
		};
		aNav[i].onmouseout = function(e){
			obj = e.fromElement || e.target;
			//alert(obj.i);
			var j = obj.i;
			obj.delay = setTimeout(function(){
				yzy.ui.expand(aUl[j],0);
			},300);
			aUl[j].onmouseover = function(){
				clearTimeout(obj.delay);
				//clearTimeout(aUl[j].delay);
				clearInterval(aUl[j].timer);
				aUl[j].style.height = aUl[j].height+'px';
			};
			aUl[j].onmouseleave = function(){
				aUl[j].delay = setTimeout(function(){
					yzy.ui.expand(aUl[j],0);
				},300);
			};
		};
	}
}