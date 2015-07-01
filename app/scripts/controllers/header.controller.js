(function (){

'use strict';

  angular
    .module('tooltipEditorFrontEndApp')
    .controller('headerController', headerController);

    headerController.$inject = ['$scope'];

    function headerController($scope) {

      $scope.test = 'test';

    }

})();
