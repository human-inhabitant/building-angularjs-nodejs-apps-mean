const express = require('express');
const path = require('path');
const debug = require('debug')('server');

const app = express();
const port = process.env.PORT || 3e3;

app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/fonts', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/fonts')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/@fortawesome/fontawesome-free/css')));
app.use('/webfonts', express.static(path.join(__dirname, '/node_modules/@fortawesome/fontawesome-free/webfonts')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/@fortawesome/fontawesome-free/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.server = app.listen(port, () => {
  debug(`Start: ${new Date()}`);
  debug(`Listening on port: ${port}`);
});
