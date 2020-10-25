/* eslint-disable no-undef */
(function () {
  angular.module('app', ['ngResource', 'ngRoute']);
  angular
    .module('app')
    .config(($routeProvider, $locationProvider) => {
      const routeRoleChecks = {
        admin: {
          auth(mvAuth) {
            return mvAuth.authorizeCurrentUserForRoute('admin');
          }
        },
        user: {
          auth(mvAuth) {
            return mvAuth.authorizeAuthenticatedUserForRoute();
          }
        }
      };
      $locationProvider.html5Mode(true);
      $routeProvider
        .when('/', {
          templateUrl: '/partials/main/main',
          controller: 'mvMainCtrl'
        })
        .when('/admin/users', {
          templateUrl: '/partials/admin/user-list',
          controller: 'mvUserListCtrl',
          resolve: routeRoleChecks.admin
        })
        .when('/profile', {
          templateUrl: '/partials/account/profile',
          controller: 'mvProfileCtrl',
          resolve: routeRoleChecks.user
        })
        .when('/signup', {
          templateUrl: '/partials/account/signup',
          controller: 'mvSignUpCtrl'
        });
    });
  angular
    .module('app')
    .run(($rootScope, $location) => {
      $rootScope.$on('$routeChangeError', (event, current, previous, rejection) => {
        if (rejection === 'not authorized') {
          $location.path('/');
        }
      });
    });
}());
