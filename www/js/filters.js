angular.module('unoApp.filters', [])
	.filter('customPhone', function() {
		var RegExp, match;

		return function(phone, type) {
			if (phone && typeof phone != 'undefined') {
				switch(type) {
					case 'ddd' :
						RegExp = /(\(\d{2}\))/gi;
						break;				
					case 'phone':
						RegExp = /[^(\(?\d{2}\)?)\s]?(\d{4,5})-(\d{4})/gi;
						break;
					default:
						RegExp = /(\(?\d{2}\)?)\s?(\d{4,5})-(\d{4})/gi;
						break;
				}

				match = RegExp.exec(phone);
				return match[0];
			}
		}
	});