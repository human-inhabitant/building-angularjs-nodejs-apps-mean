const mongoose = require('mongoose');
const crypto = require('crypto');
const debug = require('debug')('app:configMongoose');

function createSalt() {
  return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
  const hmac = crypto.createHmac('sha1', salt);
  hmac.setEncoding('hex');
  hmac.write(pwd);
  hmac.end();
  return hmac.read();
}

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
    userName: String,
    salt: String,
    hashedPwd: String,
    roles: [String]
  });
  userSchema.methods = {
    authenticate(passwordToMatch) {
      return hashPwd(this.salt, passwordToMatch) === this.hashedPwd;
    }
  };
  const User = mongoose.model('User', userSchema);
  User
    .find({}, (err, collection) => {
      if (collection.length === 0) {
        let salt = createSalt();
        let hashedPwd = hashPwd(salt, 'human');
        User.create({
          firstName: 'Human',
          lastName: 'Inhabitant',
          userName: 'human',
          salt,
          hashedPwd,
          roles: ['admin']
        });

        salt = createSalt();
        hashedPwd = hashPwd(salt, 'decepticon');
        User.create({
          firstName: 'Megatron',
          lastName: 'Galvatron',
          userName: 'decepticon',
          salt,
          hashedPwd,
          roles: []
        });
      }
    });
}

module.exports = configMongoose;

