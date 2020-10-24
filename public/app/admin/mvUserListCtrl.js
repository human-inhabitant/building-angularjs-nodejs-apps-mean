/* eslint-disable no-undef */
(function () {
  function mvUserListCtrl($scope, mvUser) {
    $scope.users = mvUser.query();
  }
  mvUserListCtrl.$inject = ['$scope', 'mvUser'];
  angular
    .module('app')
    .controller('mvUserListCtrl', mvUserListCtrl);
}());
