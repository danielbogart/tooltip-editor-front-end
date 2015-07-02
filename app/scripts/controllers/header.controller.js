(function (){

'use strict';

  angular
    .module('tooltipEditorFrontEndApp')
    .controller('headerController', headerController);

    headerController.$inject = ['$scope', 'loggedInService'];

    function headerController($scope, loggedInService) {

      $scope.loggedIn = loggedInService.checkUser();
      $scope.logOut = function() {
        loggedInService.logOut();
      }

    }

})();
