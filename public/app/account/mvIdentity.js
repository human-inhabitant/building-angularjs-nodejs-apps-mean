/* eslint-disable no-undef */
(function () {
  function mvIdentity() {
    return {
      currentUser: undefined,
      isAuthenticated() {
        return !!this.currentUser;
      }
    };
  }
  angular
    .module('app')
    .factory('mvIdentity', mvIdentity);
}());
