const mongoose = require('mongoose');
const debug = require('debug')('app:configMongoose');

function configMongoose(config) {
  mongoose.connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.connection.on('error', (err) => {
    debug(`MongoDB connection error:${err}`);
  });
  mongoose.connection.once('open', () => {
    debug('MongoDB connection opened to MultiVision');
  });

  const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String
  });
  const User = mongoose.model('User', userSchema);
  User
    .find({})
    .exec((err, collection) => {
      if (collection.length === 0) {
        User.create({
          firstName: 'Human',
          lastName: 'Inhabitant',
          userName: 'human'
        });
        User.create({
          firstName: 'Megatron',
          lastName: 'Galvatron',
          userName: 'decepticon'
        });
      }
    });
}

module.exports = configMongoose;
