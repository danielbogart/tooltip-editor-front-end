(function (){

'use strict';

  angular
    .module('tooltipEditorFrontEndApp')
    .controller('mainController', mainController);

    mainController.$inject = ['$scope', '$window', 'Restangular'];

    function mainController($scope, $window, Restangular) {

      var test;

      test = Restangular.all('states');

      test.getList().then(function(states) {
        $scope.states = Restangular.stripRestangular(states);
      });
    }

})();
