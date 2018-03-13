var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../config/auth');
var db = require("../models");
const router = require("express").Router();


// Helper functions
// =============================================================
function verifyPassword(user, password) {
  // Expect password in database to be plaintext (for testing only)
  //if (user.pass === password) {
  // Expect password in database to be hashed

  if (bcrypt.compareSync(password, user.pass)) {
    return true;
  } else {
    return false;
  }
}

// Routes
// =============================================================

  // Login route
router.route("/")
  .post(function(req, res) {
   let pass = req.body.password;
  db.User.findOne({ where: { username: req.body.username }}).then(function(user) {
    if (!user) {
      res.send({ success: false, message: 'Authentication failed. User not found.' });
    } else if (!verifyPassword(user, pass)) {
      res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
    } else {
      var token = jwt.sign({user_id: user.id, username: user.username}, 'TEST!', { expiresIn: 10080 });
      res.json({ success: true, err:null, token: 'JWT ' + token });
    }
  });
});

router.route("/new")

module.exports = router;