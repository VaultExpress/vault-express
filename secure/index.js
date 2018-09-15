const express = require('express');
const router = express.Router();

module.exports = function(db) {

  router.get('/profile', (req, res) => {
    let data = {
      username: req.user.username,
      displayname: req.user.displayName,
      fullname: req.user.name.givenName + ' ' + req.user.name.middleName + ' ' + req.user.name.familyName,
      email: req.user.emails[0].value,
      info1: req.user.info1
    };
    res.render('profile', data);
  });

  return router;
};
