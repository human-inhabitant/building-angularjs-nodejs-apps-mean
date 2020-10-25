const mongoose = require('mongoose');
const debug = require('debug')('app:controllerCourses');

const Course = mongoose.model('Course');

function getCourses(req, res) {
  Course.find({}, (err, collection) => {
    res.send(collection);
  });
}

module.exports = {
  getCourses
};
