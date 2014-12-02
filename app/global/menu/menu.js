'use strict';

angular.module('mobile.global', [
	'mobile.global.controllers',
]);

angular.module('mobile.global.controllers', ['LocalStorageModule','ionic'])

.controller('GlobalCtrl', function($scope, $ionicPopup, $timeout) {
	$scope.login = function() {
		$scope.loginData = {};
		var loginPopup = $ionicPopup.show({
			title: 'Login',
			templateUrl: 'app/activities/login/login.html',
			scope: $scope,
			buttons: [
				{text: '<div class="button button-block button-positive">Log in</div>',
					onTap: function(e) {
						if (!$scope.loginData.username || !$scope.loginData.password) {
							e.preventDefault();
						}
						else {
							return $scope.loginData;
						}
					}
				}
			]
		});
		loginPopup.then(function(res) {
			console.log('Doing login', res);
		});
	};
	//$scope.login();
});