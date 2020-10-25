const mongoose = require('mongoose');
const debug = require('debug')('app:modelUser');
const encrypt = require('../utilities/encryption');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: '{PATH} is required.'
  },
  lastName: {
    type: String,
    required: '{PATH} is required.'
  },
  userName: {
    type: String,
    required: '{PATH} is required.',
    unique: true
  },
  salt: {
    type: String,
    required: '{PATH} is required.'
  },
  hashedPwd: {
    type: String,
    required: '{PATH} is required.'
  },
  roles: [String]
});
userSchema.methods = {
  authenticate(passwordToMatch) {
    return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashedPwd;
  },
  hasRole(role) {
    return this.roles.indexOf(role) > -1;
  }
};
const User = mongoose.model('User', userSchema);

function createDefaultUsers() {
  User
    .find({}, (err, collection) => {
      debug('Default user set check...');
      if (collection.length === 0) {
        let salt = encrypt.createSalt();
        let hashedPwd = encrypt.hashPwd(salt, 'human');
        User.create({
          firstName: 'Human',
          lastName: 'Inhabitant',
          userName: 'human',
          salt,
          hashedPwd,
          roles: ['admin']
        });

        salt = encrypt.createSalt();
        hashedPwd = encrypt.hashPwd(salt, 'decepticon');
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

exports.createDefaultUsers = createDefaultUsers;
