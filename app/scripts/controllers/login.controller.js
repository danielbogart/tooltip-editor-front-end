(function (){

'use strict';

  angular
    .module('tooltipEditorFrontEndApp')
    .controller('loginController', loginController);

    loginController.$inject = ['$scope', '$window', '$state', 'Restangular'];

    function loginController($scope, $window, $state, Restangular) {

      $scope.submit = function() {
        // authenticate
        Restangular.setDefaultHeaders({ 'Authorization': 'Basic ' +btoa($scope.username+':'+$scope.password) });
        Restangular.oneUrl('token', 'http://localhost:3000/token').get().then(function(token){
          var strippedToken = Restangular.stripRestangular(token);
          $window.localStorage.setItem('ae.tooltip-editor.token', angular.toJson(strippedToken));
          console.log($window.localStorage.getItem('ae.tooltip-editor.token'));
          $state.go('main', {}, { reload: true });
        });
      };

    }
})();
