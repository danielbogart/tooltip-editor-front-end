(function (){

'use strict';

  angular
    .module('tooltipEditorFrontEndApp')
    .controller('loginController', loginController);

    loginController.$inject = ['$scope', '$window', '$state', 'Restangular', 'loggedInService'];

    function loginController($scope, $window, $state, Restangular, loggedInService) {

      $scope.submit = function() {
        // authenticate
        Restangular.setDefaultHeaders({ 'Authorization': 'Basic ' +btoa($scope.username+':'+$scope.password) });
        Restangular.oneUrl('token', 'http://dev.adverseevents.io/tooltip/token').get().then(function(token){

          var getToken = $window.localStorage.getItem('ae.tooltip-editor.token');

          if (getToken) {
            $window.localStorage.removeItem('ae.tooltip-editor.token');
          }

          var strippedToken = Restangular.stripRestangular(token);
          $window.localStorage.setItem('ae.tooltip-editor.token', angular.toJson(strippedToken));
          loggedInService.checkUser() ? $state.go('root.main', {}, { reload: true }) : alert('Incorrect username or password');
        });
      };

    }
})();
