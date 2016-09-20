(function() {
  'use strict';

  angular
    .module('recruitingApp')
    .controller('FavoritesController', FavoritesController);

  /** @ngInject */
  function FavoritesController(favoritesService) {
    var vm = this;

    // Shared variables
    vm.developers = null;

    // Shared functions
    vm.removeFavorite = removeFavorite;

    activate();

    function activate () {
      var developersAsObj = favoritesService.getDevelopers();

      vm.developers = Object.keys(developersAsObj).map(function (key) {
        return developersAsObj[key];
      });
    }

    function removeFavorite (developer) {
      vm.developers.splice(vm.developers.indexOf(developer), 1);
      favoritesService.removeDeveloper(developer);
    }
  }
})();
