/* eslint-disable no-undef */
(function () {
  function mvSignUpCtrl($scope, $location, mvAuth, mvNotifier, mvUser) {
    $scope.signUp = () => {
      const newUserData = {
        firstName: $scope.fname,
        lastName: $scope.lname,
        userName: $scope.email,
        password: $scope.password,
      };
      function success() {
        mvNotifier.notify('User account created.');
        $location.path('/');
      }
      function failure(reason) {
        mvNotifier.error(reason);
      }
      mvAuth
        .createUser(newUserData)
        .then(success, failure);
    };
  }

  mvSignUpCtrl.$inject = ['$scope', '$location', 'mvAuth', 'mvNotifier', 'mvUser'];
  angular
    .module('app')
    .controller('mvSignUpCtrl', mvSignUpCtrl);
}());
