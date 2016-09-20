(function() {
  'use strict';

  angular
    .module('recruitingApp')
    .factory('favoritesService', favoritesService);

  /** @ngInject */
  function favoritesService() {
    var developers = {};

    var service = {
      addDeveloper: addDeveloper,
      removeDeveloper: removeDeveloper,
      isFavorite: isFavorite,
      getDevelopers: getDevelopers
    };

    return service;

    function addDeveloper (developer) {
      developer.isFavorite = true;
      developers[developer.id] = developer;
    }

    function removeDeveloper (developer) {
      developer.isFavorite = false;
      delete developers[developer.id];
    }

    function isFavorite (developerId) {
      return developerId in developers;
    }

    function getDevelopers () {
      return developers;
    }
  }
})();
