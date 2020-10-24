/* eslint-disable no-undef */
(function () {
  function mvIdentity($window, mvUser) {
    let currentUser;
    if ($window.bootstrappedUserObject) {
      // eslint-disable-next-line new-cap
      currentUser = new mvUser();
      angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
      currentUser,
      isAuthenticated() {
        return this.currentUser;
      },
      isAuthorized() {
        return this.currentUser && this.currentUser.roles.indexOf('admin') > -1;
      }
    };
  }
  angular
    .module('app')
    .factory('mvIdentity', mvIdentity);
}());
