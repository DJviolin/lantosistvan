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

router.get('/', (req, res) => {
  const html =
    '<div>\n\
       Admin page!\n\
    </div>';
  res.send(html);
});

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
