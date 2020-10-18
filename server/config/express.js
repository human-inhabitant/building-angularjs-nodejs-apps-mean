const express = require('express');
const session = require('express-session');
const stylus = require('stylus');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookeParser = require('cookie-parser');
const passport = require('passport');
const debug = require('debug')('app:configExpress');

function configExpress(app, config) {
  app.set('views', path.join(config.rootPath, '/server/views'));
  app.set('view engine', 'jade');

  app.use(morgan('dev'));
  app.use(cookeParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(session({
    secret: 'Jqi!f@cCdeC@46Eqot5jfr2PZNR76m&2',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(stylus.middleware({
    src: path.join(config.rootPath, '/public'),
    compile: (str, pth) => stylus(str).set('filename', pth)
  }));
  app.use(express.static(path.join(config.rootPath, '/public')));
}

module.exports = configExpress;
