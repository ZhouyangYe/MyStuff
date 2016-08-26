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
		return {loading: true,cPage: this.props.cPage,iCount:0,trigger:{t:true,c:true}, error: null, data: {}};
	},
	
	componentWillReceiveProps(nextProps){
		if (nextProps.number != this.props.number) {
            $.when(this.props.source).then(
				value=>{
					var data = JSON.parse(value);
					var aLi = [];
					for(var i=0;i<this.props.number;i++){
						aLi[i] = [];
					}
					//console.log(data);
					if(!data.length){
						return ;
					}
					this.setState({loading: false,cPage: this.props.cPage,iCount:0,data: data,_index: 0,aLi: aLi,index_list: 0});
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
				for(var i=0;i<this.props.number;i++){
					aLi[i] = [];
				}
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
		//console.log(this.state.iCount);
		var _index = this.state._index+1;
		var index_list = this.getShort();
		var cPage = this.state.cPage;
		var trigger = this.state.trigger;
		//console.log("out:"+cPage);
		if(_index>=this.state.data.length){
			if(this.state.trigger.c){
				this.state.trigger.c = false;
			}
			trigger.t = true;
			//console.log("if:"+cPage);
			//var h=1;
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
			if(!this.state.trigger.c){
				this.state.trigger.c=true;
			}
			var iCount = this.state.iCount+1;
			this.setState({loading: false,cPage: cPage,iCount:iCount,data: this.state.data,_index: _index,aLi: this.state.aLi,index_list: index_list});
		}
	},
	
	handleScroll: function(cPage,index_list,trigger){
		//console.log('yea');
		var oLi = $("#pictures li").eq(index_list);
		var scrollTop = $(window).scrollTop()||$(document).scrollTop();
		if(oLi.offset().top+oLi.outerHeight()<$(window).height()+scrollTop){
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
					//console.log(cPage);
					this.setState({loading: false,cPage: cPage,data: data,_index: 0,aLi: this.state.aLi,index_list: index_list})
				},
				error=>this.setState({loading: false,error: error})
			);
		}
	},
	
	getShort: function(){
		//alert('yea');
		var index = 0;
		var aLi = $('#pictures li');
		var iH = aLi.eq(index).outerHeight();
		//console.log(aLi.length);
		for(var i=0;i<aLi.length;i++){
			//console.log(aLi.eq(i).outerHeight()+" : "+iH);
			if(aLi.eq(i).outerHeight()<iH){
				index = i;
				iH = aLi.eq(i).outerHeight();
			}
		}
		//console.log(index);
		return index;
	},
	
	render: function(){
		if (this.state.loading) {
			return <Loading />;
		}
		else if (this.state.error != null) {
			return <span>Error: {this.state.error.message}</span>;
		}
		else {
			var aList = [];
			var aLi = this.state.aLi;
			//console.log(this.state.data);
			//console.log(data[_index].height);
			var _index = this.state._index;
			var index_list = this.state.index_list;
			//console.log(index_list);
			var data = this.state.data;
			//console.log(_index+" : "+this.state.iCount);
			var width_img = (Math.floor(1080/this.props.number)-30)+"px";
			var width = (Math.floor(1080/this.props.number)-10)+'px';
			var height =  data[_index].height * ( parseInt(width_img) / data[_index].width ) + 'px';
			//console.log(this.state.iCount);
			if(this.state.trigger.c){
				aLi[index_list].push(<div key={this.state.iCount}><img src={data[_index].preview} style={{height:height}}></img><p>{data[_index].title}</p></div>);
			}
			for(var i=0;i<this.props.number;i++){
				aList.push(<li key={i} style={{width:width}}>{this.state.aLi[i]}</li>);
			}
			return <ul>{aList}</ul>;
		}
	}
});

ReactDOM.render(
	<Toggle />,
	document.getElementById('pictures')
);