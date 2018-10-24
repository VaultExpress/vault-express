const LocalStrategy = require('passport-local').Strategy;
const util = require('../util');
const cfg = require('../config');

module.exports = (passport, db) => {
  const options = {
    usernameField: 'username',
    passwordField: 'password',
  };

  const authen = (username, password, done) => {
    // try {
    //   const user = db.findByName(username);

    //   if (user) {
    //     const match = util.comparePassword(password, user.password);
    //     if (match) return done(null, user);
    //     return done(null, false, { message: cfg.msg_auth_invalid_password });
    //   }

    //   return done(null, false, { message: cfg.msg_auth_invalid_username });
    // } catch (err) {
    //   return done(err, false, { message: cfg.msg_auth_found_error });
    // }

    db.findByName(username)
      .then((result) => {
        if (result.password) {
          const match = util.comparePassword(password, result.password);

          if (match) return done(null, result);
          return done(null, false, { message: cfg.msg_auth_invalid_password });
        }

        return done(null, false, { message: cfg.msg_auth_invalid_username });
      })
      .catch(err => done(err, false, { message: cfg.msg_auth_found_error }));
  };

  passport.use(new LocalStrategy(options, authen));
};
