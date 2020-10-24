const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');
const debug = require('debug')('app:configPassport');

function configPassport() {
  passport.use(new LocalStrategy((username, password, done) => {
    User
      .findOne({ userName: username }, (err, user) => {
        if (user && user.authenticate(password)) {
          debug(user);
          return done(null, user);
        }
        return done(null, false);
      });
  }));
  passport.serializeUser((user, done) => {
    if (user) {
      done(null, user._id);
    }
  });
  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    });
  });
}

module.exports = configPassport;
