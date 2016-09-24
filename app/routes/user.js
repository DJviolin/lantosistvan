const express = require('express');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User = require('../models/user');

const router = express.Router();
//const app = express();

/////////////////////////////////////////////////////////////
// Json Web Token Test
/////////////////////////////////////////////////////////////

/*router.get('/', (req, res) => {
  res.send('/api-test route works!');
});*/

/*router.route('/all')
  .get((req, res) => {
    User.find((err, movies) => {
      if (err) {
        return res.send(err);
      }
      return res.json(movies);
    });
  });*/

// db.users.find().pretty()
// db.users.remove( {"_id": ObjectId("57e58fd30387832fbc05bd5c")});
router.get('/setup', (req, res) => {
  // create a sample user
  const nick = new User({
    name: 'Nick Cerminara',
    password: 'password',
    admin: true,
  });
  // save the sample user
  nick.save((err) => {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({ success: true });
  });
});

// TODO: route middleware to verify a token
// route to show a random message (GET http://127.0.0.1:8081/user/)
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});
// route to return all users (GET http://127.0.0.1:8081/user/users)
router.get('/users', (req, res) => {
  //console.log(req.app.get('superSecret'));
  User.find({}, (err, users) => {
    res.json(users);
  });
});

// route to authenticate a user (POST http://127.0.0.1:8081/user/authenticate)
router.post('/authenticate', (req, res) => {
  // find the user
  User.findOne({
    name: req.body.name,
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      // check if password matches
      if (user.password !== req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // if user is found and password is right
        // create a token
        const token = jwt.sign(user, req.app.get('jwtTokenSecret'), {
          expiresIn: 60 * 60 * 24, // expires in 24 hours
        });
        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          //token: token,
          token,
        });
      }
    }
  });
});

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
