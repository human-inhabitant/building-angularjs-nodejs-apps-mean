const path = require('path');
const mongoose = require('mongoose');
const debug = require('debug')('app:configRoutes');
const auth = require('./auth');

const User = mongoose.model('User');

function configRoutes(app) {
  app.get('/api/users', auth.requiresRole('admin'), (req, res) => {
    User.find({}, (err, collection) => {
      res.send(collection);
    });
  });
  app.get('/partials/*', (req, res) => {
    res.render(path.join('..', '..', 'public', 'app', req.params[0]));
  });
  app.post('/login', auth.configAuth);
  app.post('/logout', (req, res) => {
    req.logout();
    res.end();
  });
  app.get('*', (req, res) => {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });
}

module.exports = configRoutes;
