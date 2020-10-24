/* eslint-disable no-undef */
(function () {
  function mvUser($resource) {
    const UserResource = $resource('/api/users/:id', { _id: '@id' });
    UserResource.prototype.isAdmin = function () {
      return this.roles && this.roles.indexOf('admin') > -1;
    };
    return UserResource;
  }
  angular
    .module('app')
    .factory('mvUser', mvUser);
}());
