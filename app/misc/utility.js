var util = {
	capitalize: function(string) {
		return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
	},

	showAlert: function(controller, title, body, button, callback) {
		var alertPopup = controller.alert({
			title: title,
			template: body,
			okText: button
		});
		alertPopup.then(function(res) {
			callback();
		});
	},

	showPrompt: function(controller,title,body,okText,cancelText,callbackTrue,callbackFalse) {
		var confirmPopup = controller.confirm({
			title: title,
			template: body,
			okText: okText,
			cancelText : cancelText
		});
		confirmPopup.then(function(res) {
			if(res) {
				callbackTrue();
			} else if (callbackFalse) {
				callbackFalse();
			}
		});
	},

	showPopup: function(controller,title,body,btn1,btn2,cancelBtn,callbackTrue,callbackFalse) {
		var myPopup = controller.show({
			title: title,
			template: body,
			buttons: [
				{text: cancelBtn},
				{text: btn1,
					onTap: function(e) {
						return 'btn1';
					}
				},
				{text: btn2,
					onTap: function(e) {
						return 'btn2';
					}
				}
			]
		});
		myPopup.then(function(res) {
			if(res === 'btn1') {
				callbackFalse();
			} else if (res === 'btn2') {
				callbackTrue();
			}
		});
	},
};