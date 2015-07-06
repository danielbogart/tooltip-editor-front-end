(function(){

  'use strict';

  angular
    .module('tooltipEditorFrontEndApp')
    .controller('ModalDemoCtrl', function ($scope, $modal, $log) {

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        scope: $scope
      });

    };

  });

  // Please note that $modalInstance represents a modal window (instance) dependency.
  // It is not the same as the $modal service used above.

  angular
    .module('tooltipEditorFrontEndApp')
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, $window, $rootScope, Restangular, authInterceptor) {
    // Restangular.setDefaultHeaders({ 'Content-Type': 'application/json' });

    $scope.newTooltip = { tooltip: {state_name: "", term: "", definition: ""} };

    $scope.status = {
      isopen: false
    };

    $scope.selectState = function(state) {
      $scope.newTooltip.tooltip.state_name = state;
    };

    $scope.toggled = function(open) {
      $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };

    $scope.ok = function () {
      Restangular.all('tooltips').post($scope.newTooltip).then(function(data){
        $rootScope.$broadcast('newtip');
      });
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });

})();

