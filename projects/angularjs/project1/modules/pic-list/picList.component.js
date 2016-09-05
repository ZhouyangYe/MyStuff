'use strict';
angular.module('picList').component('picList',{
	templateUrl:'modules/pic-list/picList.template.html',
	controller:function picListControllrt($http){
		var _this = this;
		$http.get('getPics.php?cpage=0').then(function(response){
			//console.log(response.data);
			_this.list = response.data;
		});
		_this.orderProp = 'id';
	}
});