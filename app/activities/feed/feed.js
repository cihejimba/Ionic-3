'use strict';

angular.module('mobile.feed', [
	'mobile.feed.controllers'
]);

angular.module('mobile.feed.controllers', ['LocalStorageModule','ionic'])

.controller('FeedCtrl', function(
	$scope,
	$state,
	$stateParams,
	$ionicLoading,
	$ionicNavBarDelegate,
	$ionicPopup,
	$ionicPlatform,
	localStorageService,
	$window,
	RSSCApi) {
	
	// Set title based on arguments
	$scope.title = !$stateParams.feedId ? 'My feed' : 'Their feed';

	// Expand collapse
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		}
		else {
			$scope.shownGroup = group;
		}
	};
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// Refresh
	$scope.refresh = function() {
		RSSCApi.getData(function(response) {
			// TODO
			
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	// Rate dialog
	$scope.rateApp = function() {
		var device = {
			isApple: ionic.Platform.isIOS(),
			isGoogle: ionic.Platform.isAndroid(),
		};
	
		var title = 'Having Fun?';
		var body;
		if (localStorageService.get('rate')) {
			body = 'Let us know what you think and what features you want added!';
		} else {
			body = 'Leave some feedback for us and get 500 GOLD! Good or bad we want to hear from you so we can continue to add to and improve the game.';
		}
		var likeBtn = '<i class="icon ion-thumbsup"></i>';
		var hateBtn = '<i class="icon ion-thumbsdown"></i>';
		var cancelBtn = '<i class="icon ion-close"></i>';
		util.showPopup($ionicPopup, title, body, hateBtn, likeBtn, cancelBtn,
			function() {
				if (!localStorageService.get('rate')) {
					localStorageService.set('rate',true);
					$rootScope.user.attributes.gold += 500;
					User.update($rootScope.user);
				}
				if (device.isApple) {
					$window.open('http://itunes.apple.com/app/id887067605', '_system');
				} else if (device.isGoogle) {
					$window.open('http://play.google.com/store/apps/details?id=com.fatchickenstudios.fitrpg', '_system');
				}
			},
			function() {
				$scope.navTo('feedback');
			}
		)
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
	
	$scope.sendMsg = function(messageData) {
		console.log(messageData);
	}
	
	// Me
	$scope.me = {
		who: 'Eod Nhoj',
		avatar: 'https://angularjs.org/img/AngularJS-large.png',
	};
	
	// Header
	$scope.header = {
		who: 'John Doe',
		desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras feugiat, velit vel tincidunt cursus, eros justo tristique est, nec feugiat purus tellus vitae nulla. Pellentesque ut porta turpis. Vivamus tellus arcu, molestie quis justo non, sollicitudin aliquet eros. Quisque et erat a sapien mollis facilisis ac at ex. Curabitur ac faucibus risus. In hac habitasse platea dictumst. Mauris magna arcu, eleifend id pellentesque dignissim, mollis vitae risus. Vestibulum eleifend ullamcorper metus. Nam porta ullamcorper nisi, non porttitor turpis rhoncus nec. Etiam ultrices tellus id enim malesuada tristique.',
		avatar: 'http://www.progarchives.com/forum/uploads/823/Martian.jpg',
		background: {
			'background-image': 'url(http://www.glamourparis.com/uploads/images/thumbs/201324/photo___les_plus_beaux_clich__s_sous_marins_2608_north_640x440.jpg)',
		}
	};
	
	// Messages
	$scope.messages = [
		{
			id: '444445556',
			who: 'John Doe',
			when: '5 minutes ago',
			avatar: 'http://www.progarchives.com/forum/uploads/823/Martian.jpg',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras feugiat, velit vel tincidunt cursus, eros justo tristique est, nec feugiat purus tellus vitae nulla. Pellentesque ut porta turpis. Vivamus tellus arcu, molestie quis justo non, sollicitudin aliquet eros. Quisque et erat a sapien mollis facilisis ac at ex. Curabitur ac faucibus risus. In hac habitasse platea dictumst. Mauris magna arcu, eleifend id pellentesque dignissim, mollis vitae risus. Vestibulum eleifend ullamcorper metus. Nam porta ullamcorper nisi, non porttitor turpis rhoncus nec. Etiam ultrices tellus id enim malesuada tristique.',
			likes: 10,
			liked: true,
			comments: [
				{
					who: 'John Doe',
					when: '5 minutes ago',
					avatar: 'http://www.progarchives.com/forum/uploads/823/Martian.jpg',
					content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras feugiat, velit vel tincidunt cursus, eros justo tristique est, nec feugiat purus tellus vitae nulla.',
				},
				{
					who: 'John Doe',
					when: '5 minutes ago',
					avatar: 'http://www.progarchives.com/forum/uploads/823/Martian.jpg',
					content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras feugiat, velit vel tincidunt cursus, eros justo tristique est, nec feugiat purus tellus vitae nulla. Pellentesque ut porta turpis.',
				},
				{
					who: 'John Doe',
					when: '5 minutes ago',
					avatar: 'http://www.progarchives.com/forum/uploads/823/Martian.jpg',
					content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras feugiat, velit vel tincidunt cursus, eros justo tristique est, nec feugiat purus tellus vitae nulla. Pellentesque ut porta turpis. Vivamus tellus arcu, molestie quis justo non, sollicitudin aliquet eros.',
				},
			],
		},
		{
			id: '444444444',
			who: 'John Doe',
			when: '35 minutes ago',
			avatar: 'http://www.progarchives.com/forum/uploads/823/Martian.jpg',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras feugiat, velit vel tincidunt cursus, eros justo tristique est, nec feugiat purus tellus vitae nulla. Pellentesque ut porta turpis. Vivamus tellus arcu, molestie quis justo non, sollicitudin aliquet eros. Quisque et erat a sapien mollis facilisis ac at ex. Curabitur ac faucibus risus. In hac habitasse platea dictumst. Mauris magna arcu, eleifend id pellentesque dignissim, mollis vitae risus. Vestibulum eleifend ullamcorper metus. Nam porta ullamcorper nisi, non porttitor turpis rhoncus nec. Etiam ultrices tellus id enim malesuada tristique.',
			likes: 1,
			liked: false,
			comments: [
				{
					who: 'John Doe',
					when: '5 minutes ago',
					avatar: 'http://www.progarchives.com/forum/uploads/823/Martian.jpg',
					content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras feugiat, velit vel tincidunt cursus, eros justo tristique est, nec feugiat purus tellus vitae nulla.',
				},
				{
					who: 'John Doe',
					when: '5 minutes ago',
					avatar: 'http://www.progarchives.com/forum/uploads/823/Martian.jpg',
					content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras feugiat, velit vel tincidunt cursus, eros justo tristique est, nec feugiat purus tellus vitae nulla. Pellentesque ut porta turpis.',
				},
				{
					who: 'John Doe',
					when: '5 minutes ago',
					avatar: 'http://www.progarchives.com/forum/uploads/823/Martian.jpg',
					content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras feugiat, velit vel tincidunt cursus, eros justo tristique est, nec feugiat purus tellus vitae nulla. Pellentesque ut porta turpis. Vivamus tellus arcu, molestie quis justo non, sollicitudin aliquet eros.',
				},
			],
		}
	];
	
	$scope.like = function(msgId) {
		for (var i=0; i<$scope.messages.length; i++) {
			var msg = $scope.messages[i];
			if (msg.id == msgId) {
				msg.liked = true;
				msg.likes ++;
				$scope.messages[i] = msg;
				
				RSSCApi.getData(function(result) {
					console.log(result);
				});
			}
		}
	};
	
	$scope.unlike = function(msgId) {
		for (var i=0; i<$scope.messages.length; i++) {
			var msg = $scope.messages[i];
			if (msg.id == msgId) {
				msg.liked = false;
				msg.likes --;
				$scope.messages[i] = msg;
			}
		}
	};
});
