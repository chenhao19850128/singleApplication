(function () {
'use strict';

angular.module('NarrowDownMenuChoiceAPP', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItem', FoundItem )
.constant('ApiBasePath',"https://davids-restaurant.herokuapp.com/");


function FoundItem() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      foundItems: '<',
      onRemove: '&'
    },
    controller: MenuListDirectiveController,
    controllerAs: 'list',
    bindToController: true,
    link: MenuListDirectiveLink
  };

  return ddo;
}


function MenuListDirectiveLink(scope, element, attrs, controller) {

  scope.$watch('list.isNothingFound()', function (newValue, oldValue) {

    if (newValue === true) {
      displayNothingFoundWarning();
    }
    else {
      removeNothingFoundWarning();
    }

  });

  function displayNothingFoundWarning() {
    // If jQuery included before Angluar
    var warningElem = element.find("div.warning");
    warningElem.slideDown(900);
  }


  function removeNothingFoundWarning() {
    // If jQuery included before Angluar
    var warningElem = element.find("div.warning");
    warningElem.slideUp(900);
  }
}

function MenuListDirectiveController() {
  var list = this;

  list.isNothingFound = function () {

    if (typeof(list.foundItems) != "undefined")
    {
      if (list.foundItems.length !== 0 ){
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return false;
    }


  };
}


// LIST #1 - controller
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var ctrl = this;

  // Use factory to create new shopping list service
  // var shoppingList = ShoppingListFactory();

  ctrl.searchTerm = '';
  //ctrl.foundItems = [];

  ctrl.getMatchedMenuItems = function (searchTerm) {
     MenuSearchService.getMatchedMenuItems(searchTerm).then(function(result){
      ctrl.foundItems = result;
    });

  };

  ctrl.removeFoundItems = function (itemIndex) {
    ctrl.foundItems.splice(itemIndex,1);
  };
}

MenuSearchService.$inject = ['$http','ApiBasePath']
function MenuSearchService($http,ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
          method: 'GET',
          url: (ApiBasePath + "/menu_items.json")
        }).then(function successCallback(response) {
            var len = response.data.menu_items.length;
            var foundItems = [];
            for (var i=0;i<len;i++){
              if (response.data.menu_items[i].description.search(searchTerm) > 0){
                foundItems.push(response.data.menu_items[i]);
              }
            }
            return foundItems;

          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(response.data);

          });

  };

}

})();
