'use strict';

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
  if (window.innerWidth > 1600) { // Browser window viewport including (if rendered) the vertical scrollbar
    bindSlick();
  } else {
    unbindSlick(); 
  }
}
document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('load', function() {
    handleSlick();
    console.log('handleSlick() fired on load...');
  });
  // The resize event is fired lots of times during resizing.
  // If you use a timer inside the resize callback that resets and
  // starts everytime the resize event fires, you prevent those 'double' fires.
  var timer;
  window.addEventListener('resize', function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
      handleSlick();
      console.log('handleSlick() fired on resize...');
    }, 100);
    //console.log('jquery on window resize');
  });
});
