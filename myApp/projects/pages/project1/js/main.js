window.onload = function(){
	yzy.app.drawChart();
	yzy.app.emailBox();
	yzy.app.toRun();
	var oCh = document.getElementById('myChart');
	oCh.style.cssText = 'width:290rem;height:30rem;';
	yzy.app.drag();
}

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

yzy.ui.fadeOut = function(obj,obj2){
	
	var iCur = yzy.tools.getStyle(obj,'opacity');
	if(iCur==0){ return false; }
	
	var value = 100;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iSpeed = -5;
		if(value == 0){
			obj.style.display = 'none';
			obj2.style.display = 'block';
			obj2.style.opacity = 0;
			yzy.ui.fadeIn(obj2);
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

yzy.app.drag = function(){
	var oChart = document.getElementById('myChart');
	var oBar = document.getElementById('drag_wrapper');
	var oButton = document.getElementById('drag');
	var oWrapper = document.getElementById('big_wrapper');
	
	//alert(cLength);
	//var aButton = oButton.getElementsByTagName('input')[0];
	//if(oButton){alert('yes');}
	
	oButton.addEventListener("mousedown",startDrag,false);
	document.addEventListener("mouseup",stopDrag,false);
	oButton.addEventListener("touchstart",startDrag,false);
	document.addEventListener("touchend",stopDrag,false);
	
	function startDrag(e){
		//alert('yes');
		var ev = e||event;
		ev.preventDefault();
		document.onmousemove = document.ontouchmove = function(e){
			var cLength = oChart.offsetWidth;
			e=e?e:window.event;
			var mouseX = e.pageX;
			//console.log(mouseX);
			var left = mouseX-oBar.offsetLeft-oWrapper.offsetLeft;
			if(left<0){
				left=0;
			}else if(left>oBar.offsetWidth){
				left = oBar.offsetWidth;
			}
			var percent = left/oBar.offsetWidth*100;
			//console.log(left);
			oButton.style.left = percent + '%';
			check();
			var length = cLength-oWrapper.clientWidth;
			oChart.style.left = -length*percent/100+'px';
			//console.log(document.documentElement.clientWidth);
		}
	}
	
	function check(){
		//console.log(p);
		if(oButton.offsetLeft<oBar.offsetLeft){
			oButton.style.left = 0+'%';
		}else if(oButton.offsetLeft>oBar.offsetWidth+oBar.offsetLeft){
			oButton.style.left = 100+'%';
		}
	}
	
	function stopDrag(){
		document.onmousemove = document.ontouchmove = function(){};
	}
}

yzy.app.toRun = function(){
	var oRun = document.getElementById('display');
	var oD = yzy.tools.getByClass(oRun,'container')[0];
	var aP = yzy.tools.getByClass(oD,'post');
	
	var oPrev = document.getElementById('la');
	var oNext = document.getElementById('ra');
	
	var iNow = 0;
	var iNext = 1;
	var iPre = aP.length-1;
	
	oPrev.onclick = function(){
		iPre=iNow-1;
		if(iPre < 0){
			iPre = aP.length-1;
		}
		
		yzy.ui.fadeOut(aP[iNow],aP[iPre]);
		
		iNow--;
		if(iNow < 0){
			iNow = aP.length-1;
		}
		//console.log(iNow);
		//console.log(iPre);
	};
	
	oNext.onclick = function(){
		iNext=iNow+1;
		if(iNext >= aP.length){
			iNext = 0;
		}
		
		yzy.ui.fadeOut(aP[iNow],aP[iNext]);
		
		iNow++;
		if(iNow >=aP.length){
			iNow = 0;
		}
		
		//console.log(iNow);
		//console.log(iNext);
	};
}

yzy.app.emailBox = function(){
	var oText = document.getElementById('email');
	
	yzy.ui.textChange(oText,'E-mail address');
}

yzy.app.drawChart = function(){
	var ctx = document.getElementById('myChart').getContext('2d');
	var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(249,249,249,1)');   
    gradient.addColorStop(1, 'rgba(255,255,255,1)');
	
	var json = list;
	//var obj = JSON.parse(json);
	var numbers = json.numbers;
	var months = [];
	var moneys = [];
	var likes = [];
	var views = [];
	var shares = [];
	
	for(var i=0;i<numbers.length;i++){
		//console.log(numbers[i].month);
		months.push(numbers[i].month);
		moneys.push(numbers[i].money);
		likes.push(numbers[i].likes);
		views.push(numbers[i].views);
		shares.push(numbers[i].shares);
	}
	
	//console.log(months.length);
	
	var data={
		labels: months,
		datasets: [{
            label: 'money ',
            data: moneys,
            backgroundColor : gradient,
			borderColor: "rgba(225,232,238,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(255,255,255,1)",
            pointBackgroundColor: "rgba(225,232,238,1)",
            pointBorderWidth: 4,
            pointHoverRadius: 11,
            pointHoverBackgroundColor: "rgba(225,232,238,1)",
            pointHoverBorderColor: "rgba(255,255,255,1)",
            pointHoverBorderWidth: 4,
			fill: true,
            pointRadius: 7,
            pointHitRadius: 11,
			lineTension: 0
        }]
	};
	
	var options = {
		responsive: false,
		legend: {
			display: false,
		},
		scales: {
			xAxes: [{
				gridLines: {
					display:false
				}
			}],
			yAxes: [{
				display: false,
				gridLines: {
					display:false
				},
				ticks: {
					display: false,
					suggestedMin: 800,
					suggestedMax: 2000
				}
			}],
		},
		tooltips: {
			backgroundColor: 'rgba(57,173,209,0.9)',
			titleFontSize: 18,
			bodyFontSize: 12,
			xPadding: 40,
			yPadding: 19
		}
	};	
	
	
	
	var lineChart = new Chart(ctx,{
		type: "line",
		data: data,
		options: options,
	});
}