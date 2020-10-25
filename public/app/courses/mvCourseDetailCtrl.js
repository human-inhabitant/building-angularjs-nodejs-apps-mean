/* eslint-disable no-undef */
(function () {
  function mvCourseDetailCtrl($scope, mvCachedCourse, $routeParams) {
    mvCachedCourse
      .query()
      .$promise
      .then((collection) => {
        collection.forEach((course) => {
          if (course._id === $routeParams.id) {
            $scope.course = course;
          }
        });
      });
  }
  mvCourseDetailCtrl.$inject = ['$scope', 'mvCachedCourse', '$routeParams'];
  angular
    .module('app')
    .controller('mvCourseDetailCtrl', mvCourseDetailCtrl);
}());
