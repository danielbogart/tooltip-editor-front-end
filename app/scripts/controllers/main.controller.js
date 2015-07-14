(function (){

'use strict';

  angular
    .module('tooltipEditorFrontEndApp')
    .controller('mainController', mainController);

    mainController.$inject = ['$scope', '$window', '$rootScope', 'Restangular', 'modalService'];

    function mainController($scope, $window, $rootScope, Restangular, modalService) {

      var stateList, tooltipList;
      var modalOptions = {
              closeButtonText: 'Cancel',
              actionButtonText: 'Delete',
              headerText: 'Delete Tooltip',
              bodyText: 'Are you sure you want to delete this tooltip?'
          };

      stateList = Restangular.all('states');
      tooltipList = Restangular.all('tooltips');

      function getStateList() {
        stateList.getList().then(function(states) {
          $scope.states = states;
        });
      }

      function getTooltipList() {
        tooltipList.getList().then(function(tooltips) {
          $scope.tooltips = tooltips;
        });
      }

      getTooltipList();
      getStateList();

      $scope.companyCollapsed = true;
      $scope.drugCollapsed = true;
      $scope.outcomeCollapsed = true;
      $scope.portfolioCollapsed = true;

      $scope.delete = function(id){
        modalService.showModal({}, modalOptions).then(function (result) {
          Restangular.one("tooltips", id).remove().then(function() {
              getStateList();
          });
        });
      }

      $scope.updateTooltip = function(updatedTooltip){
        var tooltip = {"tooltip": updatedTooltip};

        Restangular.one("tooltips", updatedTooltip.id).customPUT(tooltip).then(function() {
          //getStateList();
        });
      }

      $scope.updateSearch = function(module) {
        $scope.searchState = module;
      }

      $scope.clearSearch = function() {
        $scope.searchState = '';
        $scope.searchText = '';
      }

      $rootScope.$on('newtip', function(event, args) {
        getStateList();
      });
    }

})();
