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