(function (){

'use strict';

/**
 * @ngdoc function
 * @name tooltipEditorFrontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tooltipEditorFrontEndApp
 */
  angular
    .module('tooltipEditorFrontEndApp')
    .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', 'Restangular'];

    function MainCtrl($scope, Restangular) {

      var test = Restangular.all('states');

      test.getList().then(function(states) {
        $scope.allStates = states;
        console.log($scope.allStates);
      });

      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    }

})();
