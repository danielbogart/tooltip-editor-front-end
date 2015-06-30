(function (){

'use strict';

  angular
    .module('tooltipEditorFrontEndApp')
    .factory('AuthService', [AuthService]);

    AuthService.$inject = ['$window', 'Restangular'];

    function AuthService($window, Restangular) {

      var exports = {
        setAuthHeader: setAuthHeader
      };

      function setAuthHeader() {
        if ($window.sessionStorage.getItem('token')) {
          var token = angular.fromJson($window.sessionStorage.getItem('token')).token
          Restangular.setDefaultHeaders({ 'Authorization': 'Token '+token });
        }
      }

      return exports;

    }

})();
