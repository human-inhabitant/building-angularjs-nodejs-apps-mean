/* eslint-disable no-undef */
(function () {
  function mvCourse($resource) {
    const CourseResource = $resource('/api/courses/:_id',
      { _id: '@id' },
      {
        update: { method: 'PUT', isArray: false }
      });
    return CourseResource;
  }
  angular
    .module('app')
    .factory('mvCourse', mvCourse);
}());
