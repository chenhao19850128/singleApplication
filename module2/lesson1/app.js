(function () {
  'use strict';

  angular.module('CustomFilterAPP',[])
  .controller('CustomFilterController',CustomFilterController);
  .filter('custom',CustomFilterFactory)
// for JS minification way 1
//  .controller('DIController',['$scope','$filter',DIController]);

// for JS minification way 2
CustomFilterController.$inject = ['$scope','customFilter'];

  function CustomFilterController ($scope, customFilter) {
    $scope.name = "chenhao";

    $scope.upper = function () {
      var upCase = $filter('uppercase');
      $scope.name = upCase($scope.name);
    };
  }

  function CustomFilterFactory () {
    return function (input,arg1,arg2){
      var output = "";
      return output;
    }
  }

})();
