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

/*// route middleware to verify a token
router.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, req.app.get('jwtTokenSecret'), (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      }
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      console.log(req.decoded);
      return next();
    });
  }
  // if there is no token
  // return an error
  return res.status(403).send({
    success: false,
    message: 'No token provided.',
  });
});*/

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
router.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, req.app.get('jwtTokenSecret'), (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.',
    });
  }
});

// route to show a random message (GET http://127.0.0.1:8081/user/)
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});
// route to return all users (GET http://127.0.0.1:8081/user/users)
router.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) throw err;
    return res.json(users);
  });
});

router.get('/check', (req, res) => {
  res.json(req.decoded);
});

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
