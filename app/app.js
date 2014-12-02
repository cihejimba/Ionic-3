angular.module('mobile', [
	'mobile.global',
	
	// Directives
	'mobile.directives.alert',
	
	// Activities
	'mobile.feed',
	'mobile.friends',
	
	// Services
	'mobile.apiservice',
])

.run(function($rootScope, $ionicPlatform, $state, $ionicNavBarDelegate, $window) {
	$ionicPlatform.ready(function() {
		ionic.Platform.fullScreen();
	});

	$ionicPlatform.registerBackButtonAction(function () {
		$ionicNavBarDelegate.back();
	}, 100);
})

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider
		.state('app', {
			url: '/app',
			templateUrl: 'app/global/menu/menu.html',
			controller: 'GlobalCtrl'
		})
		.state('app.feed', {
			url: '/feed/:feedId',
			views: {
				'mainContainer': {
					templateUrl: 'app/activities/feed/feed.html',
					controller: 'FeedCtrl'
				}
			}
		})
		.state('app.friends', {
			url: '/friends/:friendId',
			views: {
				'mainContainer': {
					templateUrl: 'app/activities/friends/friends.html',
					controller: 'FriendCtrl'
				}
			}
		})
		;
		
	$urlRouterProvider.otherwise('/app/feed/');
	$locationProvider.html5Mode(false);
});
