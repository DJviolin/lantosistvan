const express = require('express');
const router = express.Router();
const User = require('../models/user');

/////////////////////////////////////////////////////////////
// Json Web Token Test
/////////////////////////////////////////////////////////////

router.get('/', (req, res) => {
  res.send('/api-test route works!');
});

router.route('/all')
  .get((req, res) => {
    User.find((err, movies) => {
      if (err) {
        return res.send(err);
      }
      return res.json(movies);
    });
  });

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

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
