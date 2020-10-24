/* eslint-disable no-undef */
(function () {
  function mvAuth($http, mvIdentity, $q, mvUser) {
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
              // eslint-disable-next-line new-cap
              const user = new mvUser();
              angular.extend(user, res.data.user);
              // eslint-disable-next-line no-param-reassign
              mvIdentity.currentUser = user;
              deferred.resolve(true);
            } else {
              deferred.resolve(false);
            }
          });
        return deferred.promise;
      },
      authorizeCurrentUserForRoute(role) {
        if (mvIdentity.isAuthorized(role)) {
          return true;
        }
        return $q.reject('not authorized');
      },
      logOutUser() {
        const deferred = $q.defer();
        $http
          .post('/logout', { logOut: true })
          .then(() => {
            // eslint-disable-next-line no-param-reassign
            mvIdentity.currentUser = undefined;
            deferred.resolve();
          });
        return deferred.promise;
      }
    };
  }
  angular
    .module('app')
    .factory('mvAuth', mvAuth);
}());
