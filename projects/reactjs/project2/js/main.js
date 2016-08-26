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
		return {loading: true,cPage: this.props.cPage,iCount:{iCount:0,bottom:bottom},trigger:{t:true}, error: null, data: {}};
	},
	
	componentWillReceiveProps(nextProps){
		if (nextProps.number != this.props.number) {
            $.when(this.props.source).then(
				value=>{
					var data = JSON.parse(value);
					var aLi = [];
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
					this.setState({loading:false,cPage:this.props.cPage,data:data,_index:0,aLi:aLi,index_list:0});
				},
				error=>this.setState({loading: false,error: error})
			);
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
				this.setState({loading: false,cPage: this.props.cPage,data: data,_index: 0,aLi: aLi,index_list: 0});
			},
			error=>this.setState({loading: false,error: error})
		);
	},
	
	componentDidUpdate: function(){
		if(!this.state.data.length){
			return ;
		}
		var _index = this.state._index+1;
		this.state.iCount.iCount++;
		//console.log(_index);
		var index_list = this.getShort();
		var cPage = this.state.cPage;
		var trigger = this.state.trigger;
		//console.log(this.state.iCount.bottom[0].iTop);
		//console.log("out:"+cPage);
		if(_index>=this.state.data.length){
			trigger.t = true;
			//console.log("if:"+cPage);
			$(window).off();
			$(window).scroll(function(){
				//console.log("scroll:"+cPage);
				//h++;
				if(trigger.t){
					this.handleScroll(cPage,index_list,trigger);
				}
				//console.log('yea');
			}.bind(this));
		}
		if(_index<this.state.data.length){
			//console.log(_index);
			this.setState({loading: false,cPage: cPage,data: this.state.data,_index: _index,aLi: this.state.aLi,index_list: index_list});
		}
	},
	
	handleScroll: function(cPage,index_list,trigger){
		//console.log('yea');
		//return null;
		var iH = this.state.iCount.bottom[index_list].iTop;
		var scrollTop = $(window).scrollTop()||$(document).scrollTop();
		if(iH<$(window).height()+scrollTop){
			//alert('yea');
			trigger.t = false;
			//console.log(cPage);
			cPage++;
			//console.log("handle:"+cPage);
			var data = $.get('getPics.php?cpage='+cPage);
			$.when(data).then(
				value=>{
					//alert('yea');
					var data = JSON.parse(value);
					//console.log(index_list);
					this.setState({loading: false,cPage: cPage,data: data,_index: 0,aLi: this.state.aLi,index_list: index_list})
				},
				error=>this.setState({loading: false,error: error})
			);
		}
	},
	
	getShort: function(){
		//alert('yea');
		var index = 0;
		var iCount = iCount;
		var _index = this.state._index;
		var index_list = this.state.index_list;
		var iH = this.state.iCount.bottom[index_list].iTop;
		//console.log(aLi.eq(index));
		if(this.state.iCount.iCount-1<this.props.number){
			if($('#pictures li').eq(_index).outerHeight()+10<iH){
				index = _index;
			}else{
				index = index_list;
			}
			this.state.iCount.bottom[_index].iTop = $('#pictures li').eq(_index).outerHeight()+10;
			//console.log(index+" : "+_index+" : "+index_list+" : "+iH);
		}else{
			this.state.iCount.bottom[index_list].iTop = iH+$('#pictures li').eq(this.state.iCount.iCount-1).outerHeight()+10;
			iH = this.state.iCount.bottom[index_list].iTop;
			for(var i=0;i<this.state.iCount.bottom.length;i++){
				if(this.state.iCount.bottom[i].iTop<iH){
					index = i;
					iH = this.state.iCount.bottom[i].iTop;
				}
				//console.log(index+" : "+_index+" : "+index_list+" : "+this.state.iCount.bottom[i].iTop);
			}
		}
		//console.log(index);
		return index;
	},
	
	getContent: function(){
		var _index = this.state._index;
		var aList = this.state.aLi;
		var iNow = this.state.index_list;
		var iTop = 0;
		var iLeft = 0;
		var data = this.state.data;
		var iWidth = Math.floor(1080/this.props.number)-10;
		var width_img = (Math.floor(1080/this.props.number)-30)+"px";
		var height =  data[_index].height * ( parseInt(width_img) / data[_index].width );
		if(isNaN(height)){
			height = 100;
		}
		if(this.state.iCount.iCount<this.props.number){
			//console.log(_index);
			iTop = 0;
			iLeft = this.state.iCount.bottom[_index].iLeft;
		}else{
			//console.log(iNow);
			iTop = this.state.iCount.bottom[iNow].iTop;
			iLeft = this.state.iCount.bottom[iNow].iLeft;
		}
		//console.log(_index);
		//console.log(this.state.iCount.iCount);
		aList.push(<li style={{width:((iWidth-20)+'px'),left:(iLeft+'px'),top:(iTop+'px')}} key={this.state.iCount.iCount}><img src={data[_index].preview} style={{height:(height+'px')}}></img><p>{data[_index].title}</p></li>);	
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
			//console.log(this.state._index);
			var aLi = this.getContent();
			return <ul>{aLi}</ul>;
		}
	}
});

ReactDOM.render(
	<Toggle />,
	document.getElementById('pictures')
);