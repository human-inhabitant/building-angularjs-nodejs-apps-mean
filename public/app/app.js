/* eslint-disable no-undef */
(function () {
  angular.module('app', ['ngResource', 'ngRoute']);
  angular
    .module('app')
    .config(($routeProvider, $locationProvider) => {
      $locationProvider.html5Mode(true);
      $routeProvider
        .when('/', {
          templateUrl: '/partials/main',
          controller: 'mainCtrl'
        });
    });

  function mainCtrl($scope) {
    $scope.myVar = 'Hello Angular...';
  }
  mainCtrl.$inject = ['$scope'];
  angular
    .module('app')
    .controller('mainCtrl', mainCtrl);
}());
