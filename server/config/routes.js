const path = require('path');
const debug = require('debug')('app:configRoutes');
const auth = require('./auth');

function configRoutes(app) {
  app.get('/partials/*', (req, res) => {
    res.render(path.join('..', '..', 'public', 'app', req.params[0]));
  });
  app.post('/login', auth);
  app.get('*', (req, res) => {
    res.render('index');
  });
}

module.exports = configRoutes;
