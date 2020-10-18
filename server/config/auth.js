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
  });
  auth(req, res, next);
}

module.exports = configAuth;
