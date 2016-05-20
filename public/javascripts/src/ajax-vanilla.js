'use strict';

/////////////////////////////////////////////////////////////
// HTML5 Form Error Messages - Vanilla JS AJAX
// http://www.w3schools.com/ajax/
// http://expressjs.com/en/api.html#req.xhr
// http://stackoverflow.com/a/15945578/1442219

// ANSWERS:
// http://stackoverflow.com/questions/32084571/why-is-an-object-in-an-xmlhttprequest-sent-to-a-node-express-server-empty
// http://stackoverflow.com/questions/12731399/good-ways-to-work-with-forms-in-node-and-express
/////////////////////////////////////////////////////////////

function ajax() {

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

  var xhr = new XMLHttpRequest();
  /*xhr.onreadystatechange = function() { // process the server response
    if(xhr.readyState === 4 && xhr.status === 200) {
      //document.getElementById('demo').innerHTML = xhr.responseText;
      document.getElementById('captcha').value = xhr.responseText;
    };
  };*/
  //xhr.open('POST', '/form', true);
  if(lang === 'hu-HU') {
    xhr.open('POST', '/hu/form', true);
  } else {
    xhr.open('POST', '/en/form', true);
  };

  //xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify(data));
  console.log(JSON.stringify(data));

};
