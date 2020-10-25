const path = require('path');
const debug = require('debug')('app:configRoutes');
const auth = require('./auth');
const courses = require('../controllers/courses');
const users = require('../controllers/users');

function configRoutes(app) {
  debug('Running routes...');

  app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
  app.post('/api/users', users.createUser);
  app.put('/api/users', users.updateUser);

  app.get('/api/courses', courses.getCourses);
  app.get('/api/courses/:id', courses.getCourseById);

  app.get('/partials/*', (req, res) => {
    res.render(path.join('..', '..', 'public', 'app', req.params[0]));
  });

  app.post('/login', auth.configAuth);
  app.post('/logout', (req, res) => {
    req.logout();
    res.end();
  });

  app.all('/api/*', (req, res) => {
    res.send(404);
  });

  app.get('*', (req, res) => {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });
}

module.exports = configRoutes;
