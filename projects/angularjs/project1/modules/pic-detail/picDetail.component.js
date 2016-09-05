'use strict';
angular.module('picDetail').component('picDetail',{
	templateUrl:'modules/pic-detail/picDetail.template.html',
	controller:['$routeParams','$http',function picDetailController($routeParams,$http){
		//console.log($routeParams.picId);
		var _this = this;
		$http.get('picDetail.php?id='+$routeParams.picId).then(function(response){
			//console.log(response.data);
			_this.info = response.data;
		});
	}]
});