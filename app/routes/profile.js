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

// GET http://127.0.0.1:8081/profile/db
router.get('/db', (req, res) => {
  User.find({}, (err, users) => {
    if (err) throw err;
    return res.json(users);
  });
});

// GET http://127.0.0.1:8081/profile/userlist
router.get('/userlist', (req, res) => {
  User.find({}, (err, users) => {
    if (err) throw err;
    res.render('profile_list', {
      layout: 'profile',
      userlist: users,
    });
  });
});

// GET http://127.0.0.1:8081/profile/adduser
router.route('/adduser')
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

    /*const html =
      `Username: ${username}<br>\n\
      Password: ${password}<br>\n\
      Logged in: ${keepMeBool}<br>\n\
      <a href="/profile">Go back</a>`;*/

    const newUser = new User({
      name: username,
      password: password,
      admin: true,
    });

    // Check if user existing
    User.findOne({
      name: req.body.username,
    }, (err, user) => {
      if (err) throw err;
      if (user) {
        res.json({ success: false, message: 'Registration failed. Username / Email already exists.' });
      } else {
        // save the sample user
        newUser.save((error) => {
          if (error) throw error;
          console.log('User saved successfully');
          //res.send(html);
          res.redirect('/profile/userlist');
        });
      }
    });
    //res.send(html);
  });

// GET http://127.0.0.1:8081/profile/deleteuser/57e787f2b6fd6509fc64c24c
router.get('/deleteuser/:id', (req, res) => {
  User.findById(req.params.id, (err, found) => {
    if (err) throw err;
    const paramsId = parseInt(req.params.id, 16);
    const objectId = parseInt(found._id, 16)
    //console.log(typeof paramsId);
    //console.log(typeof objectId);
    if (paramsId !== objectId) {
      res.json({ Error: 'ObjectId Not found' });
    } else {
      found.remove(() => {
        console.log('User deleted successfully');
        res.redirect('/profile/userlist');
      });
    }
  });
});

/*router.route('/')
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
      <a href="/profile">Go back</a>`;

    const newUser = new User({
      name: username,
      password: password,
      admin: true,
    });

    // Check if user existing
    User.findOne({
      name: req.body.username,
    }, (err, user) => {
      if (err) throw err;
      if (user) {
        res.json({ success: false, message: 'Registration failed. Username / Email already exists.' });
      } else {
        // save the sample user
        newUser.save((error) => {
          if (error) throw error;
          console.log('User saved successfully');
          //res.send(html);
          res.redirect('/profile/userlist');
        });
      }
    });
    //res.send(html);
  });*/

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
