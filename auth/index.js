const express = require('express');
const router = express.Router();
const passport = require('passport')
const local = require('./local');
//const github = require('./github');
//const google = require('./google');
const cfg = require('../config');

module.exports = function(db) {

  router.use(passport.initialize());
  router.use(passport.session());

  passport.serializeUser(function(user, done) {
    return done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    let user = db.findById(id);
    if (user) {
      return done(null, user);
    }
  });

  local(passport, db);

//  if (typeof process.env.GOOGLE_CONSUMER_KEY !== 'undefined'){
//    google(passport, "secrets.google");
//  }


  router.post('/signup', (req, res) => {
    res.send('signup.....');
  });

  router.post('/signin', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return res.json({ error: info.message }); }
      if (!user) { return res.json({ error: info.message }); }
      req.login(user, function(err) {
        if (err) { return res.json({ error: cfg.msg_auth_passport_login_error }); }
        return res.json({ result: "success" });
      });
    })(req, res, next);
  });

  return router;
};
