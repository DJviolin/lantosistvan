'use strict';

/////////////////////////////////////////////////////////////
// HTML5 Form Error Messages - Vanilla JS AJAX
// http://www.w3schools.com/ajax/
// https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started
// http://expressjs.com/en/api.html#req.xhr
// http://stackoverflow.com/a/15945578/1442219

// ANSWERS:
// http://stackoverflow.com/questions/32084571/why-is-an-object-in-an-xmlhttprequest-sent-to-a-node-express-server-empty
// http://stackoverflow.com/questions/12731399/good-ways-to-work-with-forms-in-node-and-express

// MIME TYPES
// For JSON: Content-Type: application/json
// For JSON-P: Content-Type: application/javascript
/////////////////////////////////////////////////////////////

if(document.body.classList.contains('contact')) {
  (function() {

    //var button = document.getElementById('xhr').onclick = function() { makeRequest('/form'); };
    document.getElementById('xhr').onclick = function() {
      makeRequest();
      console.log('#xhr button clicked!');
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

      console.log(firstname);
      console.log(JSON.stringify(data));
      if(firstname === firstname.match(/^kettő$/igm)[0]) {
        console.log('MATCH FOR: ' + firstname);
      } else {
        console.log('NO MATCH FOR: ' + firstname);
      };

      // instance of a class that provides this functionality
      var xhr = new XMLHttpRequest();

      // decide what you want to do after you receive the server response to your request
      /*xhr.onreadystatechange = function() {
        try {
          // process the server response
          if (xhr.readyState === 4 && xhr.status === 200) {
            // everything is good, the response is received
            //alert(xhr.responseText);
            var response = JSON.parse(xhr.responseText);
            alert(response.computedString);
          } else {
            // still not ready
            alert('There was a problem with the request.');
          };
        } catch(e) {
          alert('Caught Exception: ' + e.description);
        };
      };*/

      // make the request
      /*if(lang === 'hu-HU') {
        xhr.open('POST', '/hu/form', true);
      } else {
        xhr.open('POST', '/en/form', true);
      };
      //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xhr.send(JSON.stringify(data));*/

    };

  })();
};
