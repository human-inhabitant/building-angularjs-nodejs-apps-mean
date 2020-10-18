/* eslint-disable no-undef */
(function () {
  function mvNavBarLoginCtrl($scope, $http, mvNotifier, mvIdentity, mvAuth) {
    $scope.identity = mvIdentity;
    $scope.signIn = (username, password) => {
      mvAuth
        .authenticateUser(username, password)
        .then((success) => {
          if (success) {
            mvNotifier.notify('You have successfully signed in...');
          } else {
            mvNotifier.notify('Username/Password combination incorrect...');
          }
        });
    };
  }
  mvNavBarLoginCtrl.$inject = ['$scope', '$http', 'mvNotifier', 'mvIdentity', 'mvAuth'];
  angular
    .module('app')
    .controller('mvNavBarLoginCtrl', mvNavBarLoginCtrl);
}());
