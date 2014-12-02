angular.module('mobile.apiservice', [])

.service('RSSCApi', function($http, localStorageService) {
	var secureUUID = localStorageService.get('secureUUID');
	function setUUID() {
		var tmp = localStorageService.get('secureUUID');
		tmp = tmp || '1rbeFJhP1bWytH9yUjjilir36ivnsNEE';
		localStorageService.set('secureUUID', tmp);
		secureUUID = tmp;
	};
		
	return {
		getData : function(callback) {
			setUUID();
			$http.get('http://hamon-digital.com/socialclub/user/feed/' + secureUUID)
				.then(function(result) {
					callback(result.data);
				});
		},
		setData : function(d) {
		},
	};
});