/* eslint-disable no-undef */
(function () {
  function mvNotifier(mvToastr) {
    return {
      notify(msg) {
        mvToastr.success(msg);
        console.info(msg);
      }
    };
  }
  angular
    .module('app')
    .value('mvToastr', toastr);
  angular
    .module('app')
    .factory('mvNotifier', mvNotifier);
}());
