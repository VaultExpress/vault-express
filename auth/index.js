const express = require('express');
const router = express.Router();
const passport = require('passport')
const local = require('./local');
//const github = require('./github');
//const google = require('./google');

module.exports = function(db) {
  router.use(passport.initialize());
  router.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    let user = db.findById(id);
    if (user) {
      done(null, user);
    }
  });

//  if (typeof process.env.GOOGLE_CONSUMER_KEY !== 'undefined'){
//    google(passport, "secrets.google");
//  }

  local(passport, db);

  router.post('/signup', (req, res) => {
    res.send('signup.....');
  });

  router.post('/signin',
    passport.authenticate('local', {
      successRedirect: '/profile',
      failureRedirect: '/'
    })
  );

  return router;
};
