(function(){
'use strict';
    angular
      .module('tooltipEditorFrontEndApp')
      .factory('loggedInService',  loggedInService);

      loggedInService.$inject = ['$window', '$state'];

        function loggedInService($window, $state) {
          var storage = $window.localStorage;
          var deserialize = angular.fromJson;
          return {
              checkUser: checkUser,
              logOut: logOut
          };

          function checkUser() {
            if (storage.getItem('ae.tooltip-editor.token')) {
              if (deserialize(storage.getItem('ae.tooltip-editor.token')).token) {
                return true;
              }
            }
          }

          function logOut() {
            $window.localStorage.removeItem('ae.tooltip-editor.token');
            $state.go('root.login', {}, {reload: true});
          }
      }
})();
