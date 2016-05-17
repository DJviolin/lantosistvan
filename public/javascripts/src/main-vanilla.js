'use strict';

/////////////////////////////////////////////////////////////
// Avoid `console` errors in browsers that lack a console
/////////////////////////////////////////////////////////////

(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/////////////////////////////////////////////////////////////
// Lazy loading portfolio div - Vanilla JS
/////////////////////////////////////////////////////////////

/*function lazyload() {
  //var sidescrollImages = document.getElementsByClassName('images');
  //for (var i=0; i<sidescrollImages.length; i++) {
  //  sidescrollImages[i].classList.remove('lazyload');
    //console.log('lazyload() fired...');
  //}
  var sidescrollImages = document.getElementsByClassName('images')[0];
  sidescrollImages.classList.remove('lazyload');
  //console.log('lazyload() fired...');
};
document.addEventListener('DOMContentLoaded', lazyload);*/

/////////////////////////////////////////////////////////////
// Latest posts resize on frontpage - Vanilla JS
/////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
  function previewImages() {
    var images = document.getElementsByClassName('preview-image');
    var width = parseInt(getComputedStyle(images[0]).width); // First element
    var calc = ( width / 4 ) * 3; // First element
    for (var i=0; i<images.length; i++) {
      //var width = parseInt(getComputedStyle(images[i]).width); // All elements
      //var calc = ( width / 4 ) * 3; // All elements
      images[i].style.height = calc + 'px';
      //console.log('previewImages() fired...');
    }
  };
  window.addEventListener('load', previewImages);
  window.addEventListener('resize', previewImages);
});

/////////////////////////////////////////////////////////////
// Mobile Nav - Vanilla JS
/////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
  function menuButton() {
    var toggleNav = document.getElementsByClassName('nav');
    for (var i=0; i<toggleNav.length; i++) {
      toggleNav[i].classList.toggle('active');
      //console.log('menuButton() fired...');
    }
  return false;
  };
  var toggleButton = document.getElementsByClassName('menu-button')[0];
  toggleButton.addEventListener('click', menuButton);
});

/////////////////////////////////////////////////////////////
// HTML5 Form Error Messages - Vanilla JS
// https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/Data_form_validation
/////////////////////////////////////////////////////////////

var lang = document.getElementsByTagName('html')[0].getAttribute('lang');

var email = document.getElementById('email');

email.addEventListener('keyup', function() {
  if (email.validity.typeMismatch && lang === 'hu-HU') {
    email.setCustomValidity('Az email formátuma ilyen legyen: \nvalami@domain.com');
  }
  else if (email.validity.typeMismatch && lang === 'en-EN') {
    email.setCustomValidity('The email format should be: \nsomething@domain.com');
  }
  else {
    email.setCustomValidity('');
  };
});




(function() {
  function field(name, langif, langelse) {

    var elem = document.createElement('div');
    elem.style.display = 'none';

    var input = document.getElementById(name);
    var parentDiv = document.getElementsByClassName(name)[0];
    input.parentNode.appendChild(elem);

    // Turning on when error is presented
    input.addEventListener('invalid', function(event) {
      event.preventDefault();
      if(! event.target.validity.valid) {
        elem.className = 'error';
        parentDiv.className += ' error-input';
        elem.style.display = 'block';
      };
      if(! event.target.validity.valid && lang === 'hu-HU') {
        elem.textContent = langif;
      } else {
        elem.textContent = langelse;
      };
    });

    // Turning off when error is not presented
    input.addEventListener('input', function() {
      if(elem.style.display === 'block') {
        elem.className = '';
        parentDiv.classList.remove('error-input');
        elem.style.display = 'none';
      };
    });

    return;
  };

  // Init function
  field('firstname', 'A keresztnév kötelező és/vagy számokat tartalmazott.', 'Firstname is required and/or the field had numbers.');
  field('surname', 'A vezetéknév kötelező és/vagy számokat tartalmazott.', 'Surname is required and/or the field had numbers.');
  field('email', 'Email cím kötelező. Ajánlott formátum: valami@domain.hu', 'Email address is required. Recommended format: something@domain.com');
  field('message', 'Üzenet mező kitöltése kötelező.', 'Message is required.');
  //field('captcha', 'Captcha kitöltése kötelező.', 'Captcha is required.');




  function captcha(name, langif, langelse) {

    var elem = document.createElement('div');
    elem.style.display = 'none';

    var input = document.getElementById(name);
    var parentDiv = document.getElementsByClassName(name)[0];
    input.parentNode.appendChild(elem);

    // Turning on when error is presented
    input.addEventListener('invalid', function(event) {
      event.preventDefault();
      //if(! event.target.validity.valid) {
      if(! event.target.validity.valid && input.value === /(^(?!kettő$|ketto$|Kettő$|Ketto$|KETTŐ$|KETTO$|two$|Two$|TWO$).*)/igm) {
      //if(! event.target.validity.valid && input.value === /^(kettő$|ketto$|Kettő$|Ketto$|KETTŐ$|KETTO$|two$|Two$|TWO)$/igm) {
        elem.className = 'error';
        parentDiv.className += ' error-input';
        elem.style.display = 'block';
      };
      if(! event.target.validity.valid && lang === 'hu-HU') {
        elem.textContent = langif;
      } else {
        elem.textContent = langelse;
      };
    });

    // Turning off when error is not presented
    input.addEventListener('input', function() {
      if(elem.style.display === 'block') {
        elem.className = '';
        parentDiv.classList.remove('error-input');
        elem.style.display = 'none';
      };
    });

    return;
  };

  captcha('captcha', 'Captcha kitöltése kötelező.', 'Captcha is required.');

})();
