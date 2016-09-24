const express = require('express');
const router = express.Router();

/*router.route('/test')
  .get((req, res) => {
    const html =
      '<form action="" method="POST">\n\
         Enter your name:\n\
         <input type="text" name="userName" placeholder="..." />\n\
         <br>\n\
         <button type="submit">Submit</button>\n\
      </form>';
    res.send(html);
  })
  .post((req, res) => {
    const userName = req.body.userName;
    const html =
      `Hello: ${userName}.<br>\n\
      <a href="/hu/test">Try again.</a>`;
    res.send(html);
  });*/

router.route('/')
  .get((req, res) => {
    res.render('admin_index', {
      layout: 'admin',
      bodyClass: 'index',
    });
  })
  .post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let loggedin = req.body.loggedin;
    const loggedinBool = loggedin === 'true' ? loggedin = true : loggedin = false;
    console.log(loggedinBool);

    const html =
      `Username: ${username}<br>\n\
      Password: ${password}<br>\n\
      Logged in: ${loggedinBool}<br>\n\
      <a href="/admin">Go back</a>`;
    res.send(html);
  });

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
