(function() {
  'use strict';

  angular
    .module('recruitingApp')
    .factory('githubApiService', githubApiService);

  /** @ngInject */
  function githubApiService($http, $log, $q, favoritesService, GITHUB_API) {

    var SEARCH_PATH = GITHUB_API + 'search/users';

    var service = {
      searchUsers: searchUsers
    };

    return service;

    function searchUsers (location, followers, language) {
      // Safe checks for arguments
      if (!location) {
        throw new Error('location must be set');
      }
      if (!angular.isString(location)) {
        throw new Error('location must be string');
      }
      if (followers && !angular.isNumber(followers)) {
        throw new Error('followers must be number');
      }
      if (language && !angular.isString(language)) {
        throw new Error('language must be string');
      }

      // Building query parameter for search endpoint
      var params = {q: "type:user location:'" + location + "' "};
      if (followers) {
        params.q += 'followers:>=' + followers + ' ';
      }
      if (language) {
        params.q += 'language:' + language;
      }

      return $http.get(SEARCH_PATH, {params: params})
        .then(searchUsersComplete)
        .catch(searchUsersFailed);

      function searchUsersComplete(response) {
        return response.data.items.map(function (user) {
          return {
            id: user.id,
            username: user.login,
            avatar_url: user.avatar_url,
            profile_url: user.html_url,
            detail_url: user.url,
            isFavorite: favoritesService.isFavorite(user.id)
          };
        });
      }

      function searchUsersFailed(error) {
        $log.error('XHR Failed for searchUsers.\n' + angular.toJson(error.data, true));
        return $q.reject();
      }
    }
  }

})();
