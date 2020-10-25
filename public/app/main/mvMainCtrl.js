/* eslint-disable no-undef */
(function () {
  function mvMainCtrl($scope, mvCachedCourse) {
    $scope.courses = mvCachedCourse.query();
  }
  mvMainCtrl.$inject = ['$scope', 'mvCachedCourse'];
  angular
    .module('app')
    .controller('mvMainCtrl', mvMainCtrl);
}());
