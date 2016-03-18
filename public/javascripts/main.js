'use strict';

// Horizontal scrolling - Pure Javascript solution
// http://www.dte.web.id/2013/02/event-mouse-wheel.html
/*(function() {
//if(document.body.className === 'horizontal') {
if(document.body.classList.contains('horizontal')) {
  //alert('It exists');

  function scrollHorizontally(e) {
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    // Scroll to the left or right in `document.documentElement` and `document.body`
    document.documentElement.scrollLeft -= (delta * 75); // Multiplied by 75
    document.body.scrollLeft -= (delta * 75); // Multiplied by 75
    e.preventDefault();
  }
  if (window.addEventListener) {
    window.addEventListener('mousewheel', scrollHorizontally, false); // IE9, Chrome, Safari, Opera
    window.addEventListener('DOMMouseScroll', scrollHorizontally, false); // Firefox
  } else {
    window.attachEvent('onmousewheel', scrollHorizontally); // IE 6/7/8
  }
};
})();*/




// Lazy loading portfolio div
$(document).ready(function() {
  // will fire IMMEDIATELY after the DOM is constructed
  //$(window).on('load', function() {
    // will only fire AFTER all pages assets have loaded
    $('.portfolio').removeClass('lazyload');
    //alert('done');
  //});
});




// Responsive header vertically
$(document).ready(function() {
  $(window).on('load resize', function() {
    if ($(this).height() < 855) {
      $('header').addClass('little-screen');
    }
    else {
      $('header').removeClass('little-screen');
    };
  });
});




// Social links
/*$(window).on('load resize', function() {
  if ($(this).width() > 1600) {
    $('.social-links a').on('mouseenter', function() {
      $(this).find('span').stop(true, true).animate({ opacity: 1 }, 200, 'linear');
    }).on('mouseleave', function() {
      $(this).find('span').stop(true, true).animate({ opacity: 0 }, 200, 'linear');
    });
    //console.log('.social-links binded...');
  }
  else {
    $(window).unbind('mouseenter');
    $(window).unbind('mouseleave');
    //console.log('.social-links unbinded...');
  };
});*/





// Mobile Nav
window.addEventListener('load', function() {
  new FastClick(document.body);
  }, false);
  $('.menu').on('click', function(e){
    $('.main-nav').toggleClass('active');
    e.preventDefault();
});




// Slick slider - Responsive
/*$(window).on('resize', function() {
  if ($(this).width() > 1600) {
    //code
  }
  else {
    //code
  };
});
$(document).ready(function() {
  $(window).resize();
});*/

// Slick slider - Responsive
function bindSlick() {
  $('.sidescroll .images').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 20, // Set at least half of all slides
    centerMode: true,
    initialSlide: 0, // Fix for centerMode with 1
    variableWidth: true,

    arrows: true,
    draggable: true,
    swipeToSlide: true,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000
  });
  //console.log('bindSlick() fired...');
}
function unbindSlick() {
  $('.sidescroll .images').slick('unslick');
  //console.log('unbindSlick() fired...');
}
function handleSlick() {
  if ($(window).width() > 1600) {
    bindSlick();
  } else {
    unbindSlick(); 
  }
}
/*$(document).ready(function() {
  // The resize event is fired lots of times during resizing.
  // If you use a timer inside the resize callback that resets and
  // starts everytime the resize event fires, you prevent those 'double' fires.
  var timer;
  $(window).on('load resize', function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
      handleSlick();
    }, 100);
  });
  handleSlick();
});*/
$(document).ready(function() {
  $(window).on('load', function() {
    handleSlick();
    console.log('handleSlick() fired on load...');
  });
  // The resize event is fired lots of times during resizing.
  // If you use a timer inside the resize callback that resets and
  // starts everytime the resize event fires, you prevent those 'double' fires.
  var timer;
  $(window).on('resize', function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
      handleSlick();
      console.log('handleSlick() fired on resize...');
    }, 100);
    //console.log('jquery on window resize');
  });
  //handleSlick();
});




// Measuring header height
$(window).on('load resize', function() {
  if ($(this).width() < 1600) {
    var headerHeight = $('header.main').outerHeight(true);
    $('.sidescroll .images, .blog main').css('margin-top', headerHeight);
  }
  else {
    $('.sidescroll .images, .blog main').css('margin-top', 0);
  };
});




// Navbar hider for handheld devices
function headerHeight() {
  var headerHeight = $('header.main').outerHeight(true);
  var mobileNavHeight = $('.toggle-mobile-nav').outerHeight(true);
  //var logoHeight = $('header.main .logo').outerHeight(true);
  //var socialHeight = $('header.main .social-links').outerHeight(true);
  //var sum = -Math.abs(logoHeight + socialHeight - 10);
  //var sum = -Math.abs(logoHeight - 10);
  var sum = -Math.abs(headerHeight - mobileNavHeight - 15);
  //console.log(sum);
  return sum;
};
function bindNavUp() {
  var lastScrollTop = 0, delta = 5;
  $(window).on('scroll', function() {
    var st = $(this).scrollTop();
   
    if(Math.abs(lastScrollTop - st) <= delta) {
      return;
    };
   
    if (st > lastScrollTop) {
      // downscroll code
      $('header.main').css('top',headerHeight()).hover(
        function() {
          $('header.main').css('top','0');
        }
      );
    }
    else {
      // upscroll code
      $('header.main').css('top','0');
    };
    lastScrollTop = st;
  });
};
function unbindNavUp() {
  $(window).unbind('scroll');
};
$(window).on('load resize', function() {
  if ($(this).width() < 1600) {
    bindNavUp();
  }
  else {
    unbindNavUp();
  };
});
