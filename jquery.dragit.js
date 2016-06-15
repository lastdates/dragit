/**
 * dragit 1.0
 * dragit is a simple jQuery plugin for making div draggable
 *
 * Copyright 2016, Atul Gupta
 * Licensed under the MIT license.
 * https://github.com/lastdates/dragit
 *
 * Date: Wed Jun 15 2016 19:54:11 GMT+0530 (IST)
 */
(function($){
	var state=0,el,el_offset,area,callback,callrun,
		dragstartX,dragstartY,scrollX,scrollY,offsetX,offsetY,
		holding='holding ',dragging='dragging'
		d=$(document),w=$(window);

	$.fn.dragit = function(options){
		el=this;
        var settings = $.extend({
            holder:this,
            area:[0,0,0,0]
        }, options );
		settings.holder.mousedown(function(e){
			if(!state){
				el.addClass(holding);
				el_offset = el.offset();
				dragstartX = e.pageX;
				dragstartY = e.pageY;
				scrollX = w.scrollLeft();
				scrollY = w.scrollTop();
				state = 1;
				area=settings.area;
				area[4]=scrollX + area[0];
				area[5]=scrollY + area[1];
				area[6]=scrollX + w.width() - area[2];
				area[7]=scrollY + w.height() - area[3];
				callback=settings.callback||0;
				callrun=0;
			}
			return false;
		});
		return this;
	}

	d.mousemove(function(e){
		if(state){
			offsetX=el_offset.left + e.pageX - dragstartX;
			offsetY=el_offset.top + e.pageY - dragstartY;
			if(offsetX < area[4])offsetX=area[4];
			else if(offsetX > area[6])offsetX=area[6];
			if(offsetY < area[5])offsetY=area[5];
			else if(offsetY > area[7])offsetY=area[7];
			callrun=1;
			el.addClass(dragging).
			    css({right:'auto'}).
			    offset({
    				left: (offsetX),
    				top: (offsetY)
    			});
		}
	});

	d.mouseup(function(){
		if(state){
			el.removeClass(holding+dragging);
			if(callback && callrun) callback(offsetX,offsetY);
			state = 0;
		}
	});
})(jQuery);
