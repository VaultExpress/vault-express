const LocalStrategy  = require('passport-local').Strategy;
const util = require('../util');

module.exports = (passport, db) => {
  const options = {
    usernameField: 'username',
    passwordField: 'password'
  };

  const authen = (username, password, done) => {
    try {
      let user = db.findByName(username);
      if (user) {
        let match = util.comparePassword(password, user.password);
        if (match) {
          done(null, user);
        } else {
          done('Invalid username/password', false);
        }
      } else {
        done('No username found', false);
      };
    } catch(err) {
      done(err, false);
    };
  };

  passport.use(new LocalStrategy(options, authen));
};
