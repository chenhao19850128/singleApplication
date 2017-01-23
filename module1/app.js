(function () {
    'use strict';

  angular.module('LunchCheckApp',[])
  .controller('LunchCheckController',LunchCheckController);

  LunchCheckController.inject = ['$scope'];

  function LunchCheckController ($scope) {

    $scope.numbers = "";
    $scope.customStyle = {};
    $scope.message = "";

    $scope.check = function () {

      if ($scope.numbers !==""){
        var splitArray = $scope.numbers.split(',');
        console.log(splitArray);
        var length = splitArray.length;
        var empties = splitArray.length - splitArray.filter(function(x){ if (x !=="") {return true;} }).length;
        console.log(empties);
        if (length - empties >3)
        {
          $scope.message = "Too much!";
          $scope.customStyle.style = {};
        }
        else {
          $scope.message = "Enjoy!";
          $scope.customStyle.style = {};
        }
      }
      else {
        $scope.message = "Please enter data first";
        $scope.customStyle.style = {"color":"red"};
      }

    }
  }

})();
