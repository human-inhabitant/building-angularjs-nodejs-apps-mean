const passport = require('passport');
const debug = require('debug')('app:configAuth');

/* eslint-disable no-undef */
function configAuth(req, res, next) {
  debug('Authenticating...');
  // eslint-disable-next-line consistent-return
  const auth = passport.authenticate('local', {
    successRedirect: '/login',
    failureRedirect: '/'
  }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.send({ success: false });
    }
    // eslint-disable-next-line no-shadow,consistent-return
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      res.send({ success: true, user });
    });
    return true;
  });
  auth(req, res, next);
}

function requiresApiLogin(req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(403);
    res.end();
  } else {
    next();
  }
}

function requiresRole(role) {
  return (req, res, next) => {
    console.info('req.user', req.user);
    if (!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
      res.status(403);
      res.end();
    } else {
      next();
    }
  };
}

module.exports = { configAuth, requiresApiLogin, requiresRole };
