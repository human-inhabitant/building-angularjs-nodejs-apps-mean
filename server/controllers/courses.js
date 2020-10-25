const mongoose = require('mongoose');
const debug = require('debug')('app:controllerCourses');

const Course = mongoose.model('Course');

function getCourses(req, res) {
  Course.find({}, (err, courses) => {
    res.send(courses);
  });
}
function getCourseById(req, res) {
  Course.findOne({ _id: req.params.id }, (err, course) => {
    res.send(course);
  });
}

module.exports = {
  getCourses, getCourseById
};
