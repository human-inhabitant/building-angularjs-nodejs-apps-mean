const express = require('express');
const debug = require('debug')('app');

const app = express();
const env = process.env.NODE_ENV || 'development';
const config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/config/routes')(app);

app.server = app.listen(config.port, () => {
  debug(`Start: ${new Date()}`);
  debug(`Listening on port: ${config.port}`);
});
