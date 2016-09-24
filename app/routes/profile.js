const express = require('express');
const router = express.Router();

// Models
const User = require('../models/user');

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
    res.render('profile_index', {
      layout: 'profile',
    });
  })
  .post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let keepMe = req.body.keepme;
    const keepMeBool = keepMe === 'true' ? keepMe = true : keepMe = false;
    console.log(keepMeBool);

    const html =
      `Username: ${username}<br>\n\
      Password: ${password}<br>\n\
      Logged in: ${keepMeBool}<br>\n\
      <a href="/admin">Go back</a>`;

    const newUser = new User({
      name: username,
      password: password,
      admin: true,
    });
    // save the sample user
    newUser.save((err) => {
      if (err) throw err;
      console.log('User saved successfully');
      //res.json({ success: true });
      res.send(html);
    });

    //res.send(html);
  });

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
