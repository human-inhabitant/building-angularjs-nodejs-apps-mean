/* eslint-disable no-undef */
(function () {
  function mvProfileCtrl($scope, mvAuth, mvIdentity, mvNotifier) {
    $scope.email = mvIdentity.currentUser.userName;
    $scope.fname = mvIdentity.currentUser.firstName;
    $scope.lname = mvIdentity.currentUser.lastName;
    $scope.update = () => {
      const newUserData = {
        userName: $scope.email,
        firstName: $scope.fname,
        lastName: $scope.lname
      };
      if ($scope.password && $scope.password.length > 0) {
        newUserData.password = $scope.password;
      }
      function resolve() {
        mvNotifier.notify('Your user account has been updated.');
      }
      function reject(reason) {
        mvNotifier.error(reason);
      }
      mvAuth
        .updateCurrentUser(newUserData)
        .then(resolve, reject);
    };
  }
  mvProfileCtrl.$inject = ['$scope', 'mvAuth', 'mvIdentity', 'mvNotifier'];
  angular
    .module('app')
    .controller('mvProfileCtrl', mvProfileCtrl);
}());
