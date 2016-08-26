var Toggle = React.createClass({
	getInitialState: function(){
		return {number:4};
	},
	
	componentDidMount: function(){
		var _this = this;
		$('h3').hover(function(){
			$(this).css("background","#456");
		},function(){
			if($(this).index()+4==_this.state.number){
				$(this).css("background","#456");
			}else{
				$(this).css("background","#eee");
			}
		});
	},
	
	handleClick: function(num,refName){
		//console.log(num);
		$('h3').css('background','#eee');
		this.refs[refName].style.background="#456";
		this.setState({
			number:num
		});
	},
	
	render: function(){
		return <div>
			<div id="buttons"><h3 ref="button1" onClick={()=>{this.handleClick(4,"button1");}.bind(this)}>4 columns</h3><h3 ref="button2" onClick={()=>{this.handleClick(5,"button2");}.bind(this)}>5 columns</h3><h3 ref="button3" onClick={()=>{this.handleClick(6,"button3");}.bind(this)}>6 columns</h3></div>
			<PicList cPage={0} number={this.state.number} source={$.get('getPics.php?cpage=0')} />
		</div>;
	}
});

var Loading = React.createClass({
	getInitialState: function(){
		return {str:"Loading"};
	},
	
	componentDidMount:function(){
		setTimeout(function(){
			if(this.isMounted()){
				this.setState({
					str:"Loading .",
					count: {num:1}
				});
			}
		}.bind(this),300);
	},
	
	componentDidUpdate: function(){
		setTimeout(function(){
			var count = this.state.count;
			var str = this.state.str;
			if(count.num<3){
				//console.log(count.num);
				str += " .";
			}else{
				str = "Loading";
				count.num = -1;
			}
			count.num++;
			if(this.isMounted()){
				this.setState({
					str:str
				});
			}
		}.bind(this),300);
	},
	
	render: function(){
		return <span>{this.state.str}</span>;
	}
});

var PicList = React.createClass({
	getInitialState: function(){
		//console.log("in");
		var bottom = [];
		var iWidth = Math.floor(1080/this.props.number)-10;
		for(var i=0;i<this.props.number;i++){
			var iLeft = i*(iWidth+10);
			bottom[i]={iLeft:iLeft,iTop:0};
		}
		return {loading: true,cPage: this.props.cPage,iCount:{iCount:0,bottom:bottom,index_list:0},trigger:{t:true}, error: null, data: {}};
	},
	
	componentWillReceiveProps(nextProps){
		var aLi = [];
		if (nextProps.number != this.props.number) {
            $.when(this.props.source).then(
				value=>{
					var data = JSON.parse(value);
					//console.log(data);
					if(!data.length){
						return ;
					}
					var bottom = [];
					var iWidth = Math.floor(1080/nextProps.number)-10;
					for(var i=0;i<this.props.number;i++){
						var iLeft = i*(iWidth+10);
						bottom[i]={iLeft:iLeft,iTop:0};
					}
					this.state.iCount.bottom = bottom;
					this.state.iCount.iCount = 0;
					this.state.iCount.index_list = 0;
					//console.log('-----------------------------');
					this.setState({loading:false,cPage:this.props.cPage,data:data,aLi:aLi});
				},
				error=>this.setState({loading: false,error: error})
			);
        }else{
			this.setState({loading:false,cPage:this.props.cPage,aLi:this.state.aLi,data:{}});
		}
	},
	
	componentDidMount: function(){
		$.when(this.props.source).then(
			value=>{
				var data = JSON.parse(value);
				var aLi = [];
				//console.log(data);
				if(!data.length){
					return ;
				}
				this.state.iCount.index_list = 0;
				this.setState({loading: false,cPage: this.props.cPage,data: data,aLi: aLi});
			},
			error=>this.setState({loading: false,error: error})
		);
	},
	
	componentDidUpdate: function(){
		//return false;
		if(!this.state.data.length){
			return <li></li>;
		}
		var cPage = this.state.cPage;
		//var trigger = this.state.trigger;
		this.state.trigger.t = true;
		$(window).off();
		$(window).scroll(function(){
			if(this.state.trigger.t){
				this.handleScroll(cPage,this.state.iCount.index_list);
			}
		}.bind(this));
	},
	
	handleScroll: function(cPage,trigger){
		//console.log('yea');
		//return false;
		var iH = this.state.iCount.bottom[this.state.iCount.index_list].iTop;
		var scrollTop = $(window).scrollTop()||$(document).scrollTop();
		if(iH<$(window).height()+scrollTop){
			//alert('yea');
			this.state.trigger.t = false;
			//console.log(cPage);
			cPage++;
			//console.log("handle:"+cPage);
			var data = $.get('getPics.php?cpage='+cPage);
			$.when(data).then(
				value=>{
					//alert('yea');
					var data = JSON.parse(value);
					//console.log(index_list);
					this.setState({loading: false,cPage: cPage,data: data,aLi: this.state.aLi})
				},
				error=>this.setState({loading: false,error: error})
			);
		}
	},
	
	getShort: function(height,i){
		//alert('yea');
		var index = 0;
		var iCount = iCount;
		var index_list = this.state.iCount.index_list;
		//console.log(index_list+" : "+this.state.iCount.bottom[index_list]);
		var iH = this.state.iCount.bottom[index_list].iTop;
		if(this.state.iCount.iCount<this.props.number){
			if(height<iH){
				index = i;
			}else{
				index = index_list;
			}
			this.state.iCount.bottom[i].iTop = height+30;
			//console.log(index+" : "+i+" : "+index_list+" : "+iH+" : "+this.state.iCount.iCount);
		}else{
			this.state.iCount.bottom[index_list].iTop = iH+height+30;
			iH = this.state.iCount.bottom[index_list].iTop;
			for(var i=0;i<this.state.iCount.bottom.length;i++){
				if(this.state.iCount.bottom[i].iTop<iH){
					index = i;
					iH = this.state.iCount.bottom[i].iTop;
				}
				//console.log(index+" : "+i+" : "+index_list+" : "+this.state.iCount.bottom[i].iTop);
			}
		}
		//console.log(index);
		return index;
	},
	
	getContent: function(){
		var aList = this.state.aLi;
		var iNow = 0;
		var iTop = 0;
		var iLeft = 0;
		var data = this.state.data;
		var iWidth = Math.floor(1080/this.props.number)-10;
		var width_img = Math.floor(1080/this.props.number)-30;
		var height =  0;
		
		for(var i=0;i<data.length;i++){
			iNow = this.state.iCount.index_list;
			height = data[i].height * ( width_img / data[i].width );
			if(isNaN(height)){
				height = 100;
			}
			if(this.state.iCount.iCount<this.props.number){
				//console.log(_index);
				iTop = 0;
				iLeft = this.state.iCount.bottom[i].iLeft;
			}else{
				iTop = this.state.iCount.bottom[iNow].iTop;
				iLeft = this.state.iCount.bottom[iNow].iLeft;
				//console.log(iNow);
			}
			//console.log(this.state.iCount.iCount);
			aList.push(<li data-height={height} style={{width:((iWidth-20)+'px'),height:(height+'px'),left:(iLeft+'px'),top:(iTop+'px')}} key={this.state.iCount.iCount}><img src={data[i].preview} style={{height:(height+'px')}}></img></li>);
			this.state.iCount.index_list = this.getShort(height,i);
			//console.log(this.state.iCount.iCount);
			this.state.iCount.iCount++;
		}
		return aList;
	},
	
	render: function(){
		if (this.state.loading) {
			return <Loading />;
		}
		else if (this.state.error != null) {
			return <span>Error: {this.state.error.message}</span>;
		}
		else {
			//console.log('s');
			var aLi = this.getContent();
			return <ul>{aLi}</ul>;
		}
	}
});

ReactDOM.render(
	<Toggle />,
	document.getElementById('pictures')
);