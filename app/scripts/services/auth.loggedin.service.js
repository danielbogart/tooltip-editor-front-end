// auth.loggedInService.service.js
(function(){
'use strict';
    angular
      .module('tooltipEditorFrontEndApp')
      .factory('loggedInService',  loggedInService);

      loggedInService.$inject = ['$window'];

        function loggedInService($window) {
          var storage = $window.localStorage;
          var deserialize = angular.fromJson;
          return {
              checkUser: checkUser
          };

          function checkUser() {
              if (storage.getItem('ae.tooltip-editor.token')) {
                if (deserialize(storage.getItem('ae.tooltip-editor.token')).token) {
                  return true;
                }
              }
          }
      }
})();
