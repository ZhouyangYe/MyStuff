
window.onload = function(){
	yzy.app.toTip();
	yzy.app.toBanner();
	yzy.app.toSel();
	yzy.app.toRun();
};

var yzy = {};  //namespace

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

yzy.ui = {};

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

yzy.ui.move = function(obj,old,now){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		
		var iSpeed = (now - old)/10;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		
		if(now == old){
			clearInterval(obj.timer);
		}
		else{
			old += iSpeed;
			obj.style.left = old + 'px';
		}
		
	},30);
	
};

yzy.app = {};

yzy.app.toTip = function(){
	var oText1 = document.getElementById('text1');
	var oText2 = document.getElementById('text2');
	
	yzy.ui.textChange(oText1,'Search website');
	yzy.ui.textChange(oText2,'Search website');
	
};

yzy.app.toBanner = function(){
	var oDd = document.getElementById('ad');
	var aLi = oDd.getElementsByTagName('li');
	
	var oPrevBg = yzy.tools.getByClass(oDd,'prev_bg')[0];
	var oNextBg = yzy.tools.getByClass(oDd,'next_bg')[0];
	
	var oPrev = yzy.tools.getByClass(oDd,'prev')[0];
	var oNext = yzy.tools.getByClass(oDd,'next')[0];
	
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
	
	oPrevBg.onmouseover = oPrev.onmouseover = function(){
		oPrev.style.display = 'block';
		clearInterval(timer);
	};
	
	oNextBg.onmouseover = oNext.onmouseover = function(){
		oNext.style.display = 'block';
		clearInterval(timer);
	};
	
	oPrevBg.onmouseout = oPrev.onmouseout = function(){
		oPrev.style.display = 'none';
		timer = setInterval(auto,3000);
	};
	
	oNextBg.onmouseout = oNext.onmouseout = function(){
		oNext.style.display = 'none';
		timer = setInterval(auto,3000);
	};
	
	oPrev.onclick = function(){
		autoPrev();
	};
	
	oNext.onclick = function(){
		auto();
	};
	
};

yzy.app.toSel = function(){
	var oSel = document.getElementById('sel1');
	var aDd = oSel.getElementsByTagName('dd');
	var aUl = oSel.getElementsByTagName('ul');
	var aH2 = oSel.getElementsByTagName('h2');
	
	for(var i=0;i<aDd.length;i++){
		aDd[i].index = i;
		aDd[i].onclick = function(ev){
			var ev = ev || window.event;
			var This = this;
			
			for(var i=0;i<aUl.length;i++){
				aUl[i].style.display = 'none';
			}
			
			aUl[this.index].style.display = 'block';
			
			document.onclick = function(){
				aUl[This.index].style.display = 'none';
			};
			
			ev.cancelBubble = true;
			
		};
		
	}
	
	for(var i=0;i<aUl.length;i++){
		
		aUl[i].index = i;
		
		(function(ul){
			
			var aLi = ul.getElementsByTagName('li');
			
			for(var i=0;i<aLi.length;i++){
				aLi[i].onmouseover = function(){
					this.className = 'active';
				};
				aLi[i].onmouseout = function(){
					this.className = '';
				};
				aLi[i].onclick = function(ev){
					var ev = ev || window.event;
					aH2[this.parentNode.index].innerHTML = this.innerHTML;
					ev.cancelBubble = true;
					this.parentNode.style.display = 'none';
				};
			}
			
		})(aUl[i]);
	}
	
};

yzy.app.toRun = function(){
	var oRun = document.getElementById('run1');
	var oUl = oRun.getElementsByTagName('ul')[0];
	var aLi = oUl.getElementsByTagName('li');
	
	var oPrev = yzy.tools.getByClass(oRun,'prev')[0];
	var oNext = yzy.tools.getByClass(oRun,'next')[0];
	
	var iNow = 0;
	
	oUl.innerHTML += oUl.innerHTML;
	
	oUl.style.width = aLi.length * aLi[0].offsetWidth + 'px';
	
	oPrev.onclick = function(){
		
		if(iNow == 0){
			iNow = aLi.length/2;
			oUl.style.left = -oUl.offsetWidth/2 + 'px';
		}
		
		yzy.ui.move(oUl,-iNow*aLi[0].offsetWidth,-(iNow-1)*aLi[0].offsetWidth);
		
		iNow--;
		
	};
	
	oNext.onclick = function(){
		
		if(iNow == aLi.length/2){
			iNow = 0;
			oUl.style.left = 0;
		}
		
		yzy.ui.move(oUl,-iNow*aLi[0].offsetWidth,-(iNow+1)*aLi[0].offsetWidth);
		
		iNow++;
		
	};
	
};








