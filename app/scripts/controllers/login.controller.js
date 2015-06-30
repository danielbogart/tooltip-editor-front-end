(function (){

'use strict';

  angular
    .module('tooltipEditorFrontEndApp')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$window', 'Restangular'];

    function LoginController($scope, $window, Restangular) {

      // Restangular.withConfig(function (RestangularConfigurer) {
      //   RestangularConfigurer.setDefaultHeaders({ 'Authorization': 'Basic ' +btoa($scope.username+':'+$scope.password) });
      // });

      $scope.submit = function() {
        // authenticate
        Restangular.setDefaultHeaders({ 'Authorization': 'Basic ' +btoa($scope.username+':'+$scope.password) });
        Restangular.oneUrl('token', 'http://localhost:3000/token').get().then(function(token){
          var strippedToken = Restangular.stripRestangular(token);
          $window.sessionStorage.setItem('token', angular.toJson(strippedToken));
          console.log($window.sessionStorage.getItem('token'));

        });
      };


      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    }
})();
