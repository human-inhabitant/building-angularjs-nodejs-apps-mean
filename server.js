const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const debug = require('debug')('app');

const app = express();
const env = process.env.NODE_ENV || 'development';
const config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);

const User = mongoose.model('User');
passport.use(new LocalStrategy((username, password, done) => {
  debug('LocalStrategy', username);
  User
    .findOne({ userName: username }, (err, user) => {
      debug('user', user);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    });
}));
passport.serializeUser((user, done) => {
  debug('Serialize', user);
  if (user) {
    // eslint-disable-next-line no-underscore-dangle
    done(null, user._id);
  }
});
passport.deserializeUser((id, done) => {
  debug('Deserialize', id);
  User.findOne({ _id: id }).exec((err, user) => {
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
});

require('./server/config/routes')(app);

app.server = app.listen(config.port, () => {
  debug(`Start: ${new Date()}`);
  debug(`Listening on port: ${config.port}`);
});
