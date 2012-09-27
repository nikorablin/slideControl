/*
	--------------------
	slideControl Plugin
	Nik Korablin
	1.0 - 09/26/2012
	--------------------
*/
(function($){
	 $.fn.slideControl = function(options) {
		
		// defaults
		var defaults = {
			speed: 400,
			lowerBound: 1,
			upperBound: 10
		};

		var options = $.extend(defaults, options);
		
		return this.each(function() {
			
			// set vars
			var o = options;
			var controller = false;
			var position = 0;
			var obj = this;
			var parent = $(this).parent();
			var label = $(parent).find('label');
			parent.html("<label>" + $(label).html() + "</label><span class=\"slideControlContainer\"><span class=\"slideControlFill\" style=\"width:" + $(obj).val()*10 + "%\"><span class=\"slideControlHandle\"></span></span></span><input type=\"text\" class=\"slideControlInput\" value=\"" + $(obj).val() + "\" />");
			var container = parent.find('.slideControlContainer');
			var fill = container.find('.slideControlFill');
			var handle = fill.find('.slideControlHandle');
			var input = parent.find('input');
			var containerWidth = container.outerWidth() + 1;
			var handleWidth = $(handle).outerWidth();
			var offset = $(container).offset();
			
			//adds shadow class to handle for IE <9
			if (getInternetExplorerVersion() < 9 && getInternetExplorerVersion() > -1) {
				handle.addClass('ieShadow');
			}
			
			// when user clicks anywhere on the slider
			$(container).click(function(e) {		
				position = checkBoundaries(Math.round(((e.pageX - offset.left + handleWidth/2)/containerWidth)*100));
				
				$(fill).animate({
					width: position + "%"
				}, o.speed);
				$(input).val(position/10);
			});
			
			// when user clicks handle
			$(handle).mousedown(function(e) {
				controller = true;
				$(document).mousemove(function(e) {
					position = checkBoundaries(Math.round(((e.pageX - offset.left + handleWidth/2)/containerWidth)*100));
					if (controller) {	
						$(fill).width(position + "%");
						$(input).val(position/10);
					}
				});
				$(document).mouseup(function() {
					controller = false;
				});
			});
			
			// when user changes value in input
			$(input).change(function() {
				var value = checkBoundaries($(this).val()*10);
				if ($(this).val() > o.upperBound)
					$(input).val(o.upperBound);
				else if ($(this).val() < o.lowerBound)
					$(input).val(o.lowerBound);
				$(fill).width(value + "%");
			});
			
		});
		
		// checks if value is within boundaries
		function checkBoundaries(value) {
			if (value < options.lowerBound*10)
				return options.lowerBound*10;
			else if (value > options.upperBound*10)
				return options.upperBound*10;
			else
				return value;
		}
		
		// checks ie version
		function getInternetExplorerVersion(){
		   var rv = -1;
		   if (navigator.appName == 'Microsoft Internet Explorer') {
			  var ua = navigator.userAgent;
			  var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			  if (re.exec(ua) != null)
				 rv = parseFloat( RegExp.$1 );
		   }
		   return rv;
		}
		
	 }
})(jQuery);