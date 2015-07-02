(function (){

'use strict';

  angular
    .module('tooltipEditorFrontEndApp')
    .controller('mainController', mainController);

    mainController.$inject = ['$scope', '$window', '$rootScope', 'Restangular'];

    function mainController($scope, $window, $rootScope, Restangular) {

      var stateList, tooltipList;

      stateList = Restangular.all('states');
      tooltipList = Restangular.all('tooltips');

      function getStateList() {
        stateList.getList().then(function(states) {
          $scope.states = states;
        });
      }

      getStateList();

      $scope.delete = function(id){
        Restangular.one("tooltips", id).remove().then(function() {
            getStateList();
        });
      }

      $rootScope.$on('newtip', function(event, args) {
        getStateList();
      });
    }

})();
