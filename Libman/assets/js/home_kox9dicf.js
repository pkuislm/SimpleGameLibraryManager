
(function() {
  var domain = document.domain;
  var base_url = "//" + domain + "/home/";
  var contents_url = base_url + "top/ranking/week/b";
  $.ajax({
    url: contents_url,
    cache: true,
    dataType: "html",
    success: function(html) {
      $("._week_ranking").replaceWith(html);
      var allImage = $('ul.slider-imgbox img');
      var allImageCount = $('ul.slider-imgbox li').length;
      completeImageCount = 0;
      for (var i = 0; i < allImageCount; i++) {
        $(allImage[i]).bind("load", function() {
          completeImageCount++;console.log(completeImageCount+'/'+allImageCount);
          if (allImageCount == completeImageCount) {
            _loop();
          }
        });
      }

      return true;
    }
  });

function _loop() {
  $('.loopslider-container').animate({ opacity: '0.92', filter: 'blur(3px)' }, 1000);

  $('ul.slider-imgbox').each(function() {
    var childElementWidth = 0;
    for (var i = 0; i < $('li', this).length; i++) {
      childElementWidth += $('li', this).eq(i).width();
    }
    $(this).css({ width: (childElementWidth) });
  });

  var $setElm = $('.loopslider');
  var slideTime = 300000;

  $setElm.each(function() {
    var classFilter = $(this).attr('rel'); // 'loopleft' or 'loopright'

    var targetObj = $(this);
    var loopsliderWidth = targetObj.width();
    var loopsliderHeight = targetObj.height();
    targetObj.children('ul').wrapAll('<div class="loopslider_wrap"></div>');

    var findWrap = targetObj.find('.loopslider_wrap');

    var loopWidth = $('ul.slider-imgbox').width();

    findWrap.css({
      top: '0',
      width: ((loopWidth) * 2),
      height: (loopsliderHeight),
      overflow: 'hidden',
      position: 'absolute'
    });

    function loopPosLeft() {
      findWrap.css({ left: '0' });
      findWrap.stop().animate({ left: '-' + (loopWidth) + 'px' }, slideTime, 'linear');
      setTimeout(function() {
        loopPosLeft();
      }, slideTime);
    }

    function loopPosRight() {
      findWrap.css({ right: '0' });
      findWrap.stop().animate({ right: '-' + (loopWidth) + 'px' }, slideTime, 'linear');
      setTimeout(function() {
        loopPosRight();
      }, slideTime);
    }

    $.support.transform = typeof $('body').css('transform') === 'string';
    $.support.transition = typeof $('body').css('transitionProperty') === 'string';

    if ($.support.transition && $.support.transform) {
      var css = $(
        '<style>' +
        '@-webkit-keyframes loopleft{0%{-webkit-transform: translate3d(0,0,0);}100%{-webkit-transform: translate3d(-' + (loopWidth) + 'px,0,0);}}\n' +
        '@keyframes loopleft{0%{transform: translate3d(0,0,0);}100%{transform: translate3d(-' + (loopWidth) + 'px,0,0);}}\n' +
        '@-webkit-keyframes loopright{0%{-webkit-transform: translate3d(0,0,0);}100%{-webkit-transform: translate3d(' + (loopWidth) + 'px,0,0);}}\n' +
        '@keyframes loopright{0%{transform: translate3d(0,0,0);}100%{transform: translate3d(' + (loopWidth) + 'px,0,0);}}\n' +
        '</style>').appendTo('head');
      if (classFilter == 'loopleft') {
        findWrap.css({ 'left': '0', 'animation': 'loopleft ' + (slideTime) + 'ms cubic-bezier(.2,0,.8,1) 0s infinite both alternate' }).children('ul').clone().appendTo(findWrap);
      }
      if (classFilter == 'loopright') {
        findWrap.css({ 'right': '0', 'animation': 'loopright ' + (slideTime) + 'ms cubic-bezier(.2,0,.8,1) 0s infinite both alternate' }).children('ul').clone().prependTo(findWrap);
      }
    } else {
      if (classFilter == 'loopleft') {
        loopPosLeft();
        findWrap.children('ul').clone().appendTo(findWrap);
      }
      if (classFilter == 'loopright') {
        loopPosRight();
        findWrap.children('ul').clone().prependTo(findWrap);
      }
    }
  });
}
});
