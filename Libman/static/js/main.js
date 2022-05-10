
$(window).on("load resize", function() {
    
    var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height);
    //if ($('.site-footer').length > 0)
    height = height - 20;
    if (height > 1) {
        $("body > div.main").css("min-height", (height - $('body > footer').height() - 20) + "px");
    }
    
});

var $navbar = $('.navbar').eq(0);
var _navbar_always_aplha = $navbar.hasClass('always_alpha');
var _is_moeiro_navbar = $navbar.hasClass('navbar-moeiro');

$(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    var hasNSA = $navbar.hasClass('nav_shadow_alpha');
    
    if (! _navbar_always_aplha) {
    if (scrollTop < 90 && hasNSA) {
        //$navbar.css({ opacity: 0 });
        $navbar.removeClass('nav_shadow_alpha');
    } else if (scrollTop > 90 && ! hasNSA) {
        if (! _is_moeiro_navbar) {
        $navbar.addClass('nav_shadow_alpha');
        } else {
        if (scrollTop > 300) {
            $navbar.removeAttr('style');
            $navbar.addClass('nav_shadow_alpha');
            return;
        }
        var offset = scrollTop - 90;
        var alpha = (480 - (offset>160?160:offset))/480;
        $navbar.css({'backgroundColor': 'rgba(255,255,255,'+ (alpha) +')'});
        }
    } else if (scrollTop < 300 && hasNSA && _is_moeiro_navbar) {
        $navbar.removeClass('nav_shadow_alpha');
    } else if (scrollTop < 15 && _is_moeiro_navbar) {
        $navbar.removeAttr('style');
    }
    }
    
    $gotop = $('#gotop');
    if (scrollTop > 260) {
        if ($gotop.is(':hidden')) {
            $gotop.css({bottom: '-40px'}).show().stop().animate({bottom: '50px'}, 200);
        }
    } else {
        if ($gotop.is(':visible') && $gotop.css('bottom') == '50px') {
            $gotop.stop().animate({ opacity: 0 }, 200, function() { $gotop.hide().css({opacity: 0.7}); });
        }
    }
    
});

$('.modal').on('show.bs.modal', function (event) {
    $(this).find('input').eq(0).focus();
    var button = $(event.relatedTarget);
    var title = button.data('title');
    if (title) $(this).find('.modal-title').text(title);
});

var today = function(mid) {
    if (! mid) mid = "-";
    var mdate=  new Date();
    var months = new Array("01","02","03","04","05","06","07","08","09","10","11","12");
    var today = mdate.getFullYear() + mid + months[mdate.getMonth()] + mid + mdate.getDate();
    
    return today;
}
var parseDate = function (date) {
    var d = (date || '').toString().split(/[- :]/);
    return new Date(d[0], d[1] - 1, d[2], d[3] || 0, d[4] || 0, d[5] || 0);
}
var replaceQuery = function(params) {
    var key, value, uri = location.href;
    if (typeof(params) != 'object') return uri;
    if (location.href.indexOf('?') > -1) {
        var patt1, patt2;
        //uri = uri.replace(/\?\&/g, '?').replace(/\&\&/g, '&');
        for (key in params) {
            value = params[key];
            patt1 = new RegExp('[\\?\\&]' + key + '=', 'i');
            patt2 = new RegExp('(.*?)(' + key + '=[^&]{0,})([*]{0,})', 'i');
            if (patt1.test(uri))
            uri = uri.replace(patt2, '$1' + key + '=' + value + '$3');
            else
            uri += '&' + key + '=' + value;
        }
    } else {
        var query = [];
        for (key in params) {
            value = params[key];
            query.push(key + '=' + value);
        }
        uri += '?' + query.join('&');
    }
    return uri;
}

var storage  = {
    key: 'voiux_storage',
    with: function(key) {
        this.key = key;
        return this;
    },
    remove: function(key) {
        if (key) this.key = key;
        return localStorage.removeItem(this.key);
    },
    fetch: function (key, def) {
        if (key) this.key = key;
        var ret = def || [];
        try {ret = JSON.parse(localStorage.getItem(this.key) || JSON.stringify(ret));}
        catch (e) {localStorage.removeItem(this.key);}
        return ret;
    },
    save: function (value) {
        localStorage.setItem(this.key, JSON.stringify(value));
    }
};

var cookie = {
    get: function(name) {
        if (document.cookie.length <= 0) return "";
        c_start = document.cookie.indexOf(name + "=");
        if (c_start != -1) {
            c_start = c_start + name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
        return "";
    },
    set: function(name,value,expiredays,path) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + (expiredays ? parseInt(expiredays) : 0));
        document.cookie = name + "=" + escape(value) + "; expires=" + exdate.toGMTString()
            + "; path=" + (path ? path : "/");
    },
    remove: function(name) {
        var exdate = new Date();
        exdate.setTime(-1000);
        document.cookie = name + "=" + ";expires=" + exdate.toGMTString() + ";path=/";
    }
};


$.fn.extend({
    insertContent: function(myValue, t) {
        var $t = $(this)[0];
        if (document.selection) { // ie  
            this.focus();
            var sel = document.selection.createRange();
            sel.text = myValue;
            this.focus();
            sel.moveStart('character', -l);
            var wee = sel.text.length;
            if (arguments.length == 2) {
                var l = $t.value.length;
                sel.moveEnd("character", wee + t);
                t <= 0 ? sel.moveStart("character", wee - 2 * t - myValue.length) : sel.moveStart(
                    "character", wee - t - myValue.length);
                sel.select();
            }
        } else if ($t.selectionStart || $t.selectionStart == '0') {
            var startPos = $t.selectionStart;
            var endPos = $t.selectionEnd;
            var scrollTop = $t.scrollTop;
            $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos,
                $t.value.length);
            this.focus();
            $t.selectionStart = startPos + myValue.length;
            $t.selectionEnd = startPos + myValue.length;
            $t.scrollTop = scrollTop;
            if (arguments.length == 2) {
                $t.setSelectionRange(startPos - t,
                    $t.selectionEnd + t);
                this.focus();
            }
        } else {
            this.value += myValue;
            this.focus();
        }
    }
});

$('#hots_list .thumbnail').each(function() {
    /*$(this).imagesLoaded(function(t) {
        $(t.images).each(function(i) {
            if (this.isLoaded) $(this.img).addClass('loaded');
            else $(this.img).addClass('failed');
            
        });
    });*/
});


$(window).ready(function() {

    $('[data-toggle="tooltip"]').tooltip();
    //$('[data-toggle="popover"]').popover();
    
    $('.navbar-nav .dropdown').off('click').click(function(e) {
        if ($(this).is('.open'))  {
            $(this).removeClass('open');
        } else {
            $(this).addClass('open');
        }
        e.stopPropagation();
    });
    $('.nav.navbar-nav li.dropdown').mouseover(function() {
        $(this).addClass('open');
    }).mouseout(function() {
        $(this).removeClass('open');
    });
    
    var pop_timeout;
    $('.pop').hover(function(e) {
        $(this).addClass('mouseover');
        //e.stopPropagation();
    }).on('mouseleave', function() {
        $(this).removeClass('mouseover');
        var self = $(this);
        clearTimeout(pop_timeout);
        pop_timeout = setTimeout(function() {
        if (self.is('.open') && ! self.is('.mouseover'))
            self.removeClass('open');
        }, 150);
    }).on('click', function(e) {
        //$(this).addClass('open');
    });
    
    var pop_toggle_timeout;
    $('.pop-toggle').hover(function(e) {
        var self = $(this);
        if (self.parent().is('.open'))  {
            //e.preventDefault();
            return;
        }
        self.addClass('mouseover');
        clearTimeout(pop_toggle_timeout);
        pop_toggle_timeout = setTimeout(function() {
            if (!self.parent().is('.open') && self.is('.mouseover'))
                self.parent().addClass('open');
        }, 200);
        //$(this).parent().addClass('open');
    }).on('mouseleave', function() {
        $(this).removeClass('mouseover');
    });
    
    $('.pop-toggle').click(function(e) {
        $(this).parent().toggleClass('open');
    });
    
    $('.pop-menu').css('display', '');
    
    $("#gotop").click(function() {
        return $("body,html").animate({
            scrollTop: 0
        }, 500), !1
    });
    
        
    $('#login_btn').on('click', function() {
        
        $('#login_dialog').modal('show');
        
    });
    
    $('ul.pagination > li.active').on('click contextmenu', function(event) {
        event.preventDefault();
        var page = parseInt(prompt('请输入跳转页数：', $(this).find('a').text()));
        if (!isNaN(page)) {
            location.href = replaceQuery({page: page});
        }
    });
    
    if ($.fn.typeahead) {
        $('input[type="search"]').typeahead({
            autoSelect: false,
            showHintOnFocus: true,
            selectOnBlur: false,
            minLength: 2,
            items: 8,
            delay: 600,
            displayText: function(item) {
                return item.name || item;
            },
            highlighter: function(item) {
                return '<span>'+item+'</span>';
            },
            matcher: function(item) {
                return true;
            },
            source: function(query, process) {
                var results = [];
                $.getJSON('/api/tag/suggest', {query: query}, function(data) {
                    $.each(data, function (i, t) {
                        results.push(t.name);
                    });
                    process(data);
                });
            }
        }).change(function() {
            /*var current = $(this).typeahead("getActive");
            if (current) {
                //console.log(current);
            }*/
        });
    }
    
});

