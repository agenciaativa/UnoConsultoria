angular.module('unoApp.filters', [])
	.filter('customPhone', function() {
		var RegExp, match;

		return function(phone, type) {
			if (typeof phone != 'undefined') {
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
	})

    .filter('slice', function() {
        return function(arr, start, end) {
            return (arr || []).slice(start, end);
        };
    })

    .filter('offset', function() {
        return function(input, start) {
            start = parseInt(start, 10);
            return input.slice(start);
        };
    });