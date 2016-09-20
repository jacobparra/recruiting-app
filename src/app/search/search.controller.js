(function() {
  'use strict';

  angular
    .module('recruitingApp')
    .controller('SearchController', SearchController);

  /** @ngInject */
  function SearchController($log, $http, githubApiService, favoritesService) {
    var vm = this;

    // Shared variables
    vm.developers = null;
    vm.searchFailed = false;
    vm.searchWorking = false;
    vm.location = 'Chile';
    vm.followers = null;
    vm.language = null;

    // Shared functions
    vm.search = search;
    vm.addFavorite = addFavorite;
    vm.removeFavorite = removeFavorite;

    activate();

    function activate() {
      // Skipped
    }

    function search (location, followers, language) {
      vm.developers = null;
      vm.searchFailed = false;
      vm.searchWorking = true;

      return githubApiService.searchUsers(location, followers, language)
        .then(searchSuccess, searchError)
        .finally(searchFinal);

      function searchSuccess(developers) {
        vm.developers = developers;
      }

      function searchError() {
        vm.searchFailed = true;
      }

      function searchFinal () {
        vm.searchWorking = false;
      }
    }

    function addFavorite (developer) {
      favoritesService.addDeveloper(developer);
    }

    function removeFavorite (developer) {
      favoritesService.removeDeveloper(developer);
    }

  }
})();
