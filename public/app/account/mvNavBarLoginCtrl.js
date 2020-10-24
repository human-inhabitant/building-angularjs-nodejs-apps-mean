/* eslint-disable no-undef */
(function () {
  function mvNavBarLoginCtrl($scope, $http, mvNotifier, mvIdentity, mvAuth, $location) {
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
          console.info('$scope.identity', $scope.identity);
        });
    };
    $scope.signOut = () => {
      mvAuth
        .logOutUser()
        .then(() => {
          $scope.username = '';
          $scope.password = '';
          mvNotifier.notify('You have successfully signed out.');
          $location.path('/');
        });
    };
  }
  mvNavBarLoginCtrl.$inject = ['$scope', '$http', 'mvNotifier', 'mvIdentity', 'mvAuth', '$location'];
  angular
    .module('app')
    .controller('mvNavBarLoginCtrl', mvNavBarLoginCtrl);
}());
