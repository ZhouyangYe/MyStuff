'use strict';
(function(){
	var oLoading = document.getElementById('loading');
	var oProgressbar = oLoading.getElementsByClassName('progressbar')[0];
	var oInner = oLoading.getElementsByClassName('inner')[0];
	var aSpan = oLoading.getElementsByTagName('span');
	var aPictures = null;
	var count = 0;
	var total = 0;
	ajax('get','../../APIs/getPics.php','',function(data){
		aPictures = JSON.parse(data);
		total = aPictures.length;
		window.onresize = function(){
			progress();
		};
		load(aPictures);
	});
	function load(aPictures){
		if(count<aPictures.length){
			var picture = document.createElement('img');
			picture.src = aPictures[count].url;
			picture.onload = function(){
				count++;
				progress();
				load(aPictures);
			};
		}else{
			setTimeout(function(){
				window.location.href="main.php";
			},1888);
		}
	}
	function progress(){
		//console.log('in');
		var length = oProgressbar.clientWidth;
		var percent = Math.round(count/total*100);
		var current = Math.round(count/total*length);
		oInner.style.clip = 'rect(0,'+current+'px,32px,0)';
		var num = parseInt(aSpan[0].innerHTML);
		clearInterval(oProgressbar.timer);
		oProgressbar.timer = setInterval(function(){
			if(num<percent){
				aSpan[0].innerHTML = num+"%";
				aSpan[1].innerHTML = num+"%";
				num += 3;
			}else{
				num = percent;
				aSpan[0].innerHTML = num+"%";
				aSpan[1].innerHTML = num+"%";
			}
		},18);
	}
})();