const express = require('express');
const passport = require('passport');
const local = require('./local');
const cfg = require('../config');
// const github = require('./github');
// const google = require('./google');

const router = express.Router();

module.exports = (db) => {
  // router.use(passport.initialize());
  // router.use(passport.session());

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    db.findById(id)
      .then((result) => {
        if (result) {
          return done(null, result);
        }

        return done(Error(cfg.msg_auth_found_error), false, { message: cfg.msg_auth_found_error });
      })
      .catch(err => done(err, false, { message: cfg.msg_auth_found_error }));
  });

  local(passport, db);

  //  if (typeof process.env.GOOGLE_CONSUMER_KEY !== 'undefined'){
  //    google(passport, "secrets.google");
  //  }

  router.post('/signup', (req, res) => res.send('signup.....'));

  router.post('/signin', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return res.json({ error: info.message }); }
      if (!user) { return res.json({ error: info.message }); }

      req.login(user, (loginError) => {
        if (loginError) { return res.json({ error: cfg.msg_auth_passport_login_error }); }
        return res.json({ result: 'success' });
      });

      return null;
    })(req, res, next);
  });

  return router;
};
