'use strict';
angular.module('mainApp').config(['$locationProvider','$routeProvider',
	function config($locationProvider,$routeProvider){
		$locationProvider.hashPrefix('!');
		
		$routeProvider.
			when('/pics',{
				template:'<pic-list></pic-list>'
			}).
			when('/pics/:picId',{
				template:'<pic-detail></pic-detail>'
			}).
			otherwise('/pics');
	}
]);