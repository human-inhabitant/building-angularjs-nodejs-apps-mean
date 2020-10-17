const express = require('express');
const stylus = require('stylus');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const debug = require('debug')('app');

const app = express();
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3e3;

mongoose.connect('mongodb://localhost:27017/multivision', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('error', (err) => {
  debug(`MongoDB connection error:${err}`);
});
mongoose.connection.once('open', () => {
  debug('MongoDB connection opened to multivision');
});
const messageSchema = mongoose.Schema({ message: String });
const Message = mongoose.model('Message', messageSchema);
let mongoMessage;
Message.findOne().exec((err, messageDoc) => {
  mongoMessage = messageDoc.message;
});

app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(stylus.middleware({
  src: path.join(__dirname, '/public'),
  compile: (str, pth) => stylus(str).set('filename', pth)
}));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/partials/:partialPath', (req, res) => {
  res.render(path.join('partials', req.params.partialPath));
});
app.get('*', (req, res) => {
  res.render('index', {
    mongoMessage
  });
});

app.server = app.listen(port, () => {
  debug(`Start: ${new Date()}`);
  debug(`Listening on port: ${port}`);
});
