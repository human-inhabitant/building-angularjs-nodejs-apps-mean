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
function updateUser(req, res, next) {
  const userUpdates = req.body;
  if (req.user._id !== userUpdates._id && !req.user.hasRole('admin')) {
    res.status(403);
    return res.end();
  }
  req.user.firstName = userUpdates.firstName;
  req.user.lastName = userUpdates.lastName;
  req.user.userName = userUpdates.userName;
  if (userUpdates.password && userUpdates.password.length > 0) {
    req.user.salt = encrypt.createSalt();
    req.user.hashedPwd = encrypt.hashPwd(req.user.salt, userUpdates.password);
  }
  req.user.save((err) => {
    if (err) {
      res.status(400);
      return res.send({ reason: err.toString() });
    }
    res.send(req.user);
  });
}

module.exports = {
  getUsers, createUser, updateUser
};
