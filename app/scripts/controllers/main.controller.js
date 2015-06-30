(function (){

'use strict';

/**
 * @ngdoc function
 * @name tooltipEditorFrontEndApp.controller:MainController
 * @description
 * # MainController
 * Controller of the tooltipEditorFrontEndApp
 */
  angular
    .module('tooltipEditorFrontEndApp')
    .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$window', 'Restangular', 'AuthService'];

    function MainController($scope, $window, Restangular, AuthService) {

      var test;

      AuthService.setAuthHeader();

      test = Restangular.all('states');

      test.getList().then(function(states) {
        $scope.states = Restangular.stripRestangular(states);
      });
    }

})();
