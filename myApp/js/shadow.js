function doShadow(){
	var oH3=document.getElementById("shadow");
	var width = oH3.offsetWidth;
	var oTimer=null;
	var iLeft=-400;
	function toMove()
	{
		//console.log("s");
		clearInterval(oTimer);
		oTimer=setInterval(function(){
			iLeft+=10;
			if(iLeft>=width)
			{
				iLeft=-400;
				clearInterval(oTimer);
			}
			oH3.style.backgroundPosition=iLeft+"px 0px";
		},20);
	}
	toMove();
	setInterval(function(){
		toMove();	
	},3000);
}