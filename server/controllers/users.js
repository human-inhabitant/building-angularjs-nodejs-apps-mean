const mongoose = require('mongoose');
const debug = require('debug')('app:controllerUsers');
const encrypt = require('../utilities/encryption');

const User = mongoose.model('User');

function getUsers(req, res) {
  User.find({}, (err, collection) => {
    res.send(collection);
  });
}
function createUser(req, res, next) {
  const userData = req.body;
  userData.userName = userData.userName.toLowerCase();
  userData.salt = encrypt.createSalt();
  userData.hashedPwd = encrypt.hashPwd(userData.salt, userData.password);
  User.create(userData, (err, user) => {
    if (err) {
      if (err.toString().indexOf('E11000') > -1) {
        // eslint-disable-next-line no-param-reassign
        err = new Error('Duplicate Username');
      }
      res.status(400);
      return res.send({ reason: err.toString() });
    }
    // eslint-disable-next-line no-shadow
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.send(user);
    });
  });
}

module.exports = {
  getUsers, createUser
};
