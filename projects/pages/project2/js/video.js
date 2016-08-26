function doFirst(){
	var myVideo = document.getElementById('content');
	var play = document.getElementById('play');
	var bar = document.getElementById('defaultBar');
	var progressBar = document.getElementById('progressBar');
	var baseSize = bar.offsetWidth-1;
	//alert(baseSize);
	
	play.addEventListener('click',function(){playOrPause(baseSize,myVideo,play,progressBar);},false);
	bar.addEventListener('click',function(e){clickedBar(e,baseSize,myVideo,progressBar,bar);},false);
}

function playOrPause(baseSize,myVideo,play,progressBar){
	if(!myVideo.paused && !myVideo.ended){
		myVideo.pause();
		play.innerHTML='Go';
		clearInterval(progressBar.timer);
	}
	else{
		myVideo.play();
		play.innerHTML='P';
		progressBar.timer = setInterval(function(){update(baseSize,myVideo,progressBar,play)},500);
	}
}


function update(baseSize,myVideo,progressBar,play){
	if(!myVideo.ended){
		var size = parseInt(myVideo.currentTime*baseSize/myVideo.duration);
		progressBar.style.width=size+'px';
	}
	else{
		progressBar.style.width='0px';
		play.innerHTML='Go';
		clearInterval(progressBar.timer);
	}
}

function clickedBar(e,baseSize,myVideo,progressBar,bar){
	if(!myVideo.paused && !myVideo.ended){
		var mouseX=e.pageX-bar.offsetLeft;
		var newTime=mouseX*myVideo.duration/baseSize;
		myVideo.currentTime=newTime;
		progressBar.style.width=mouseX+'px';
	}
}