/*!
 * jquery-input-history
 * https://github.com/erming/jquery-input-history
 *
 * Copyright (c) 2014 Mattias Erming <mattias@mattiaserming.com>
 * Licensed under the MIT License.
 *
 * Version 0.1.0
 */

(function($) {
	$.fn.inputHistory = function(options) {
		var settings = $.extend({
			history: [],
			submit: false,
		}, options);
		
		var self = this;
		if (self.size() > 1) {
			return self.each(function() {
				$(this).inputHistory();
			});
		}
		
		self.data('history', settings.history.concat(['']));
		
		var i = 0;
		self.on('keydown', function(e) {
			var history = self.data('history');
			var key = e.which;
			switch (key) {
			
			case 13: // Enter
				if (self.val() != '') {
					i = history.length;
					history[i - 1] = self.val();
					history.push('');
				}
				if (settings.submit) {
					self.parents('form').eq(0).submit();
				} else {
					self.val('');
				}
				break;
			
			case 38: // Up
			case 40: // Down
				history[i] = self.val();
				if (key == 38 && i != 0) {
					i--;
				} else if (key == 40 && i < history.length - 1) {
					i++;
				}
				self.val(history[i]);
				break;
			
			default:
				return;
			
			}
			
			return false;
		});
	}
})(jQuery);