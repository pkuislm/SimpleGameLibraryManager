

var _foo = 'bar';


$(document).ready(function() {
    
    var sheight = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height);
    var cheight = $('body > div.main > .container').height();
    if (sheight - cheight > 60 + $('.page-footer').height()) {
        $('.site-footer').css('visibility', 'hidden');
    }
    
    
});



function dhash(string, length) {
    var length = length ? length : 32;
    var start = 0;
    var i = 0;
    var result = '';
    var filllen = length - string.length % length;
    for (i = 0; i < filllen; i++) {
        string += "0";
    }
    while (start < string.length) {
        result = stringxor(result, string.substr(start, length));
        start += length;
    }
    return result;
}

function stringxor(s1, s2) {
    var s = '';
    var hash = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var max = Math.max(s1.length, s2.length);
    for (var i=0; i<max; i++) {
        var k = s1.charCodeAt(i) ^ s2.charCodeAt(i);
        s += hash.charAt(k % 52);
    }
    return s;
}


function toggleFullScreen(el) {
    if (!document.fullscreen && !document.mozFullScreen && !document.webkitFullScreen) {
      if (el.requestFullScreen) {
            el.requestFullScreen();
      } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
      } else {
            el.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else {
            document.webkitCancelFullScreen();
        }
    }
};


(function($) {

    $.fn.popbox = function(options) {

        var box = $('.my-popbox');
        if (!box.length) {
            box = $(' <div class="my-popbox clearfix">' +
                '  <div class="popbox-pointer">' +
                '        <div class="gb_I"></div>' +
                '        <div class="gb_H"></div>' +
                '  </div>' +
                '  <div class="popbox-container">' +
                '       <div class="loadding"></div>' +
                '  </div>' +
                '</div>'
            ).appendTo('body');
        }
        var that = $(this);
        var dataurl = [];
        var current = 0;
        var open = function(event) {
            if (event) event.preventDefault();
            if (that.data('href')) {
                getdata(that.data('data-href'));
            }
            $('.js-popbox').removeClass('openpop');
            show();
            if (that.data('closest')) {
                that.closest(that.data('closest')).find('.dropdown-toggle').dropdown('toggle');
            }
            return false;
        }
        var show = function() {
            var clientWidth = document.documentElement.clientWidth;
            var clientHeight = document.documentElement.clientHeight;
            if(that.data('closest')) var target = that.closest(that.data('closest'));
            else var target = that;
            that.addClass('openpop');
            var p = target.offset();
            var bw = box.outerWidth(true);
            var bh = box.outerHeight(true);
            var w = target.outerWidth(true);
            var h = target.outerHeight(true);
            var left = 0,
                top = 0;
            box.attr('class', 'my-popbox popbox-' + that.data('placement'));
            switch(that.data('placement')) {
                case 'cover':
                    left = p.left;
                    top = p.top;
                    break;
                case 'right':
                    left = p.left + w + 10;
                    top = p.top + h / 2 - bh / 2;
                    break;
                case 'top':
                    top = p.top - bh - 10;
                    left = p.left + w / 2 - bw / 2;
                    break;
                case 'bottom':
                    top = p.top + h + 10;
                    left = p.left + w / 2 - bw / 2;
                    break;
                case 'left':
                    left = p.left - bw - 10;
                    top = p.top + h / 2 - bh / 2;
                    break;
                default:
                    left = p.left + w + 10;
                    top = p.top + h / 2 - bh / 2;
                    break;
            }
            //????????????????????????
            if (that.data('auto-adapt')) {
                switch (that.data('placement')) {
                    case 'right':
                    case 'left':
                        if(left + bw > clientWidth) left = clientWidth - bw - 10;
                        if(left < 0) left = 10;
                        if(top + bh > (clientHeight + jQuery(window).scrollTop())) top = clientHeight + jQuery(window).scrollTop() - bh - 10;
                        if(top < 0) top = 10;
                        break;
                    case 'top':
                    case 'bottom':
                        if(top + bh > (clientHeight + jQuery(window).scrollTop()) && (that.data('placement') != 'bottom' && that.data('placement') != 'cover')) top = clientHeight - bh - 10 + jQuery(window).scrollTop();
                        if(top < 0) top = 10;
                        if(left + bw > clientWidth) left = clientWidth - bw - 10;
                        if(left < 0) left = 10;

                        break;
                    case 'cover':
                        if(left + bw > clientWidth) left = clientWidth - bw - 10;
                        if(left < 0) left = 10;
                        break;
                }
            }
            box.css({
                'display': 'block',
                'left': left,
                'top': top /*,'min-width':w*/
            });
            switch (that.data('placement')) {
                case 'right':
                case 'left':
                    var top = p.top - top + h / 2 - 10;
                    if(top + 25 > bh) top = bh - 25;
                    else if(top < 5) top = 5;
                    box.find('.gb_I,.gb_H').attr('style', 'top:' + (top) + 'px');
                    break;
                case 'top':
                case 'bottom':
                    var left = p.left - left + w / 2 - 10;
                    if(left + 25 > bw) left = bw - 25;
                    else if(left < 5) left = 5;
                    box.find('.gb_I,.gb_H').attr('style', 'left:' + left + 'px');
                    break;
            }
            $(document).off('click.popbox').on('click.popbox',function(event){
                if (!$(event.target).closest('.popbox,.ui-icon,.dzzdate,.ui-corner-all', '#jquery-color-picker').length) {
                    close();
                    $('.openpop').removeClass('openpop');
                }
            });
        }
        
        var getdata = function(url) {
            if (!url) url = that.data('href');
            if (url == '#') {
                var html = that.siblings('.popbox-html').html();
                data_operate(html);
            } else {
                var s=(url.indexOf('?') != -1) ? '&' :'?';
                url+=s+'t='+new Date().getTime();
                current = dataurl.push(url);
                $.get(url, function(html) {
                    data_operate(html);
                });
            }
        }
        var data_operate = function(html){
            box.find('.popbox-container').html(html);
            box.find('.js-popbox').on('click', function() {
                getdata($(this).data('href'));
                return false;
            });
            box.find('.js-popbox-prev').on('click', function() {
                goto_prev()
                return false;
            });
            box.find('.close,.cancel').on('click', function(event) {
                event.preventDefault();
                close();
            });
            show();
        }
        var goto_prev = function() {
            if(current > 1) {
                current -= 1;
            } else {
                current = 0;
            }
            url = dataurl[current - 1];
            dataurl.splice(current - 1, dataurl.length - current + 1);
            getdata(url);
        }
        var close = function() {
            current = 0;
            dataurl = [];
            box.data('prevel', null);
            box.fadeOut("fast", function() {
                box.find('.popbox-container').html('<div class="loadding"></div>');
            });
            that.removeClass('openpop');
            $(document).off('click.popbox');
        }
        if (options == 'update') {
            window.setTimeout(function() {
                show();
            });
        } else if (options == 'open') {
            window.setTimeout(function() {
                open();
            });
        } else if (options == 'close') {
            close();
        } else if (options == 'getdata') {
            getdata();
        } else {
            $(this).off('click.popbox').on('click.popbox', open);
        }
    }
    
})(jQuery);

