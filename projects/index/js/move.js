"use strict";
//var count = 0;
function startMove(obj,json,endFn,speed){
		//var def = parseInt(getComputedStyle(document.documentElement,null).getPropertyValue('font-size'));
		var destination = {};
		for(var attr in json){
			if(attr!='opacity'&&attr!='scrollTop'){
				json[attr] = Math.floor(json[attr]*controller.def/10);
				//console.log(json[attr]);
			}
		}
		//console.log('running');
		//console.log(def);
		clearInterval(obj.timer);
		
		var speed = speed?speed:3;
		
		obj.timer = setInterval(function(){
			var bBtn = true;
			//def = parseInt(getComputedStyle(document.documentElement,null).getPropertyValue('font-size'));
			for(var attr in json){
				
				var iCur = 0;
			
				if(attr == 'opacity'){
					iCur = Math.round(getStyle(obj,attr)*100);
					//console.log(speed);
				}else if(attr == 'scrollTop'){
					iCur = Math.floor(obj.scrollTop);
					//console.log(iCur);
				}else{
					iCur = parseInt(getStyle(obj,attr)) || 0;
				}
				
				var iSpeed = (json[attr] - iCur)/speed;
				/*
				if(attr == 'opacity'){
					console.log("speed: "+iSpeed);
				}
				*/
				iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if(iCur!=json[attr]){
					bBtn = false;
				}
				
				if(attr == 'opacity'){
					obj.style.opacity = (iCur + iSpeed)/100;
					//console.log("opacity: "+obj.style.opacity);
					//console.log(iCur+":op");
				}else if(attr == 'scrollTop'){
					//console.log('in');
					obj[attr] = iCur + iSpeed;
				}
				else{
					obj.style[attr] = iCur + iSpeed + 'px';
					//console.log(iCur+":other");
				}
				//console.log('running');
			}
			
			if(bBtn){
				clearInterval(obj.timer);
				//console.log(iCur);
				for(var attr in json){
					if(attr!='opacity'&&attr!='scrollTop'){
						//console.log(obj.style[attr]);
						obj.style[attr] = parseInt(obj.style[attr])/controller.def+'rem';
						//console.log(obj.style[attr]);
					}
				}
				if(endFn){
					endFn.call(obj);
				}
			}
			
		},30);
	
	}
	
	
	function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}
		else{
			return getComputedStyle(obj,false)[attr];
		}
	}