(function (){

'use strict';

  angular
    .module('tooltipEditorFrontEndApp')
    .controller('mainController', mainController);

    mainController.$inject = ['$scope', '$window', '$rootScope', 'Restangular'];

    function mainController($scope, $window, $rootScope, Restangular) {

      var stateList;
      stateList = Restangular.all('states');

      function getStateList() {
        stateList.getList().then(function(states) {
          $scope.states = Restangular.stripRestangular(states);
        });
      }

      getStateList();

      $rootScope.$on('newtip', function(event, args) {
        getStateList();
      });
    }

})();
