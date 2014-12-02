'use strict';

angular.module('mobile.friends', [
	'mobile.friends.controllers'
]);

angular.module('mobile.friends.controllers', ['LocalStorageModule','ionic'])

.controller('FriendCtrl', function(
	$scope,
	$state,
	$stateParams,
	$ionicLoading,
	$ionicNavBarDelegate,
	$ionicPopup,
	$ionicPlatform,
	localStorageService,
	$window) {
	
	console.log('State', $stateParams);
	
	$scope.showFeed = function(index) {
		$state.go('app.feed', { feedId: index});
	};
	
	// Alerts
	$scope.showAlerts = false;
	$scope.alerts = [
		{
			type: 'success',
			msg:'blablabla',
		},
		{
			type: 'error',
			msg:'blablabla',
		}
	];
	$scope.alertCount = $scope.alerts.length;
	$scope.navTo = function() {
		alert('hello');
	};
	$scope.displayAlerts = function() {
		$scope.showAlerts = !$scope.showAlerts;
	};
	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
		$scope.alertCount = $scope.alerts.length;
	};
});
