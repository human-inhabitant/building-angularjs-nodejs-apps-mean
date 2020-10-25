const mongoose = require('mongoose');
const debug = require('debug')('app:configMongoose');
const userModel = require('../models/User');

function configMongoose(config) {
  mongoose.connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  mongoose.connection.on('error', (err) => {
    debug(`MongoDB connection error:${err}`);
  });
  mongoose.connection.once('open', () => {
    debug('MongoDB connection opened to MultiVision');
  });
  userModel.createDefaultUsers();
}

module.exports = configMongoose;
