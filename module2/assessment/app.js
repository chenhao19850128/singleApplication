(function (){
  'use strict';

  angular.module('ShoppingListCheckOff',[])

  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .service('ShoppingListService',ShoppingListService);

  ToBuyController.$inject = ['$scope','ShoppingListService'];
  AlreadyBoughtController.$inject = ['$scope','ShoppingListService'];

  function ToBuyController ($scope,ShoppingListService) {
    var tobuylist = this;
    tobuylist.items = ShoppingListService.getToBuyItems();
    tobuylist.isFinished = ShoppingListService.getToBuyListStatus();
    tobuylist.bought = function ($index) {
      ShoppingListService.addAlreadyBoughtItem($index);
      ShoppingListService.removeToBuyItem($index);
    }

    $scope.$watch(function () { return ShoppingListService.getToBuyListStatus(); }, function (newVal, oldVal) {
        tobuylist.isFinished = newVal;
      });

  }

  function AlreadyBoughtController ($scope,ShoppingListService){
    var alreadyboughtlist = this;
    alreadyboughtlist.items = ShoppingListService.getAlreadyBoughtItems();
    alreadyboughtlist.isEmpty = ShoppingListService.getAlreadyBoughtListStatus();

    $scope.$watch(function () { return ShoppingListService.getAlreadyBoughtListStatus(); }, function (newVal, oldVal) {
        alreadyboughtlist.isEmpty = newVal;
      });

  }

  function ShoppingListService () {
    var service = this;
    var tobuylist_isFinished = false;
    var alreadyboughtlist_isEmpty = true;
    //list of To Buy items
    var toBuyItems = [{name:"cookies",quantity:10},{name:"Apples",quantity:20},{name:"Oranges",quantity:5},{name:"Breads",quantity:15},{name:"Beers",quantity:150}];

    //list of Already bought items
    var alreadyBoughtItems = [];

    service.getToBuyItems = function (){
      return toBuyItems;
    }

    service.getAlreadyBoughtItems = function (){
      return alreadyBoughtItems;
    }

    service.removeToBuyItem = function (itemIndex) {
      toBuyItems.splice(itemIndex,1);

      if (toBuyItems.length===0)
      tobuylist_isFinished = true;
    }

    service.addAlreadyBoughtItem = function (itemIndex) {
      var item = {
        name: toBuyItems[itemIndex].name,
        quantity: toBuyItems[itemIndex].quantity
      };

      alreadyBoughtItems.push(item);

      if (alreadyBoughtItems.length > 0)
      alreadyboughtlist_isEmpty = false;
    }

    service.getToBuyListStatus = function (){
      return tobuylist_isFinished;
    }

    service.getAlreadyBoughtListStatus = function (){
      return alreadyboughtlist_isEmpty;
    }

  }


})();
