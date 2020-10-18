/* eslint-disable no-undef */
(function () {
  function mvAuth($http, mvIdentity, $q) {
    return {
      authenticateUser(username, password) {
        const deferred = $q.defer();
        $http
          .post('/login', {
            username,
            password
          })
          .then((res) => {
            if (res.data.success) {
              // eslint-disable-next-line no-param-reassign
              mvIdentity.currentUser = res.data.user;
              deferred.resolve(true);
            } else {
              deferred.resolve(false);
            }
          });
        return deferred.promise;
      }
    };
  }
  angular
    .module('app')
    .factory('mvAuth', mvAuth);
}());
