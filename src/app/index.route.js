(function() {
  'use strict';

  angular
    .module('recruitingApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        abstract: true,
        url: '',
        templateUrl: 'app/main/main.html'
      })
      .state('main.search', {
        url: '/search',
        templateUrl: 'app/search/search.html',
        controller: 'SearchController',
        controllerAs: 'vm'
      })
      .state('main.favorites', {
        url: '/favorites',
        templateUrl: 'app/favorites/favorites.html',
        controller: 'FavoritesController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/search');
  }

})();
