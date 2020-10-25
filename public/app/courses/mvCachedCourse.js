/* eslint-disable no-undef */
(function () {
  function mvCachedCourse(mvCourse) {
    let courseList;
    return {
      query() {
        if (!courseList) {
          courseList = mvCourse.query();
        }
        return courseList;
      }
    };
  }
  angular
    .module('app')
    .factory('mvCachedCourse', mvCachedCourse);
}());
