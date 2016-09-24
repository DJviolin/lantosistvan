const express = require('express');
const User = require('../models/user');

const router = express.Router();

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

// TODO: route to authenticate a user (POST http://127.0.0.1:8081/user/authenticate)
// TODO: route middleware to verify a token
// route to show a random message (GET http://127.0.0.1:8081/user/)
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});
// route to return all users (GET http://127.0.0.1:8081/user/users)
router.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    res.json(users);
  });
});

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
