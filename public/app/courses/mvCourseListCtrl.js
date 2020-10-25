/* eslint-disable no-undef */
(function () {
  function mvCourseListCtrl($scope, mvCachedCourse) {
    $scope.courses = mvCachedCourse.query();
    $scope.sortOptions = [
      { value: 'title', text: 'Sort by Title' },
      { value: 'published', text: 'Sort by Publish Date' }
    ];
    $scope.sortOrder = $scope.sortOptions[0].value;
  }
  mvCourseListCtrl.$inject = ['$scope', 'mvCachedCourse'];
  angular
    .module('app')
    .controller('mvCourseListCtrl', mvCourseListCtrl);
}());
