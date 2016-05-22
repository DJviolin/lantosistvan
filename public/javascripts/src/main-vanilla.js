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
// Global Variables
/////////////////////////////////////////////////////////////

var lang = document.getElementsByTagName('html')[0].getAttribute('lang');

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

if(document.body.classList.contains('index')) {
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
}

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

if(document.body.classList.contains('contact')) {
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
};

/////////////////////////////////////////////////////////////
// HTML5 Form Error Messages - Vanilla JS AND AJAX
/////////////////////////////////////////////////////////////

(function() {
  if(document.body.classList.contains('contact')) {

    document.getElementById('xhr').onclick = function() {
      //validate();
      //document.getElementById('form').submit();
      field('firstname', 'A keresztnév kötelező és/vagy számokat tartalmazott.', 'Firstname is required and/or the field had numbers.');
      field('surname', 'A vezetéknév kötelező és/vagy számokat tartalmazott.', 'Surname is required and/or the field had numbers.');
      field('email', 'Email cím kötelező. Ajánlott formátum: valami@domain.hu', 'Email address is required. Recommended format: something@domain.com');
      field('message', 'Üzenet mező kitöltése kötelező.', 'Message is required.');
      field('captcha', 'Captcha kitöltése kötelező.', 'Captcha is required.');
      makeRequest();
      console.log('#xhr button clicked - AJAX!');
    };
    /*document.getElementById('xhr').addEventListener('onclick', function() {
      //validate();
      document.getElementById('form').submit();
      field('firstname', 'A keresztnév kötelező és/vagy számokat tartalmazott.', 'Firstname is required and/or the field had numbers.');
      field('surname', 'A vezetéknév kötelező és/vagy számokat tartalmazott.', 'Surname is required and/or the field had numbers.');
      field('email', 'Email cím kötelező. Ajánlott formátum: valami@domain.hu', 'Email address is required. Recommended format: something@domain.com');
      field('message', 'Üzenet mező kitöltése kötelező.', 'Message is required.');
      field('captcha', 'Captcha kitöltése kötelező.', 'Captcha is required.');
      makeRequest();
      console.log('#xhr button clicked - AJAX!');
    });*/

    function field(name, langif, langelse) {

      var elem = document.createElement('div');
      elem.style.display = 'none';

      var input = document.getElementById(name);
      var parentDiv = document.getElementsByClassName(name)[0];
      input.parentNode.appendChild(elem);

      if(!input.checkValidity() && name !== 'captcha') {
        elem.className = 'error';
        parentDiv.className += ' error-input';
        elem.style.display = 'block';
      };

      if(!input.checkValidity() && lang === 'hu-HU') {
        elem.textContent = langif;
      } else {
        elem.textContent = langelse;
      };


      /*function captchaInit() {
        var answers = {
          'kettő': true,
          'ketto': true,
          'Kettő': true,
          'Ketto': true,
          'KETTŐ': true,
          'KETTO': true,
          'two': true,
          'Two': true,
          'TWO': true
        };
        return input.value in answers;
      };*/

      // Turning on when error is presented
      /*input.addEventListener('invalid', function(event) {
        event.preventDefault();
        if(!event.target.validity.valid && name !== 'captcha') {
          elem.className = 'error';
          parentDiv.className += ' error-input';
          elem.style.display = 'block';
        };

        //if(!event.target.validity.valid && name === 'captcha' && !(input.value in answers)) {
        //if(!event.target.validity.valid && name === 'captcha') {
        //if(!event.target.validity.valid && name === 'captcha' && !captchaInit()) {
        /*if(!event.target.validity.valid &&
           name === 'captcha' &&
           input.value === input.value.match(/(^(?!kettő$|ketto$|Kettő$|Ketto$|KETTŐ$|KETTO$|two$|Two$|TWO$).*)/gm)[0]) {
          elem.className = 'error-captcha';
          parentDiv.className += ' error-input-captcha';
          elem.style.display = 'block';
        };*/

        /*if(!event.target.validity.valid && lang === 'hu-HU') {
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
      });*/

      return;
    };

    function makeRequest() {

      var firstname = document.getElementById('firstname').value,
          surname   = document.getElementById('surname').value,
          email     = document.getElementById('email').value,
          subject   = document.getElementById('subject').value,
          message   = document.getElementById('message').value,
          captcha   = document.getElementById('captcha').value;

      var data = {
        firstname: firstname,
        surname: surname,
        email: email,
        subject: subject,
        message: message,
        captcha: captcha
      };

      /*console.log(firstname);
      if(firstname.match(/^kettő$/igm)) {
        console.log('MATCH FOR: ' + firstname);
      } else {
        console.log('NO MATCH FOR: ' + firstname);
      };*/
      console.log(JSON.stringify(data));

      // instance of a class that provides this functionality
      var xhr = new XMLHttpRequest();

      // decide what you want to do after you receive the server response to your request
      xhr.onreadystatechange = function() {
        try {
          // process the server response
          //if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          if(xhr.readyState === 4 && xhr.status === 200) {
            // everything is good, the response is received
            //alert(xhr.responseText);
            document.getElementById('responseText').innerHTML = xhr.responseText;
            //var response = JSON.parse(xhr.responseText);
            //alert(response.computedString);
          } else {
            // still not ready
            console.log('There was a problem with the request.');
          };
        } catch(e) {
          console.log('Caught Exception: ' + e.description);
        };
      };

      // make the request
      if(lang === 'hu-HU') {
        xhr.open('POST', '/hu/contact', true);
      } else {
        xhr.open('POST', '/en/contact', true);
      };
      //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xhr.send(JSON.stringify(data));

    };

  };
})();
