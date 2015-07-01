(function (){

'use strict';

  angular
    .module('tooltipEditorFrontEndApp')
    .factory('authInterceptor', authInterceptor)
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });

    authInterceptor.$inject = ['$log', '$window', '$q', '$injector', '$rootScope'];

    function authInterceptor($log, $window, $q, $injector, $rootScope) {

        return {
          request: addToken,
          requestError: handleRequestError,
          responseError: handleResponseError,
          setCurrentUser: setCurrentUser,
          getCurrentUser: getCurrentUser
        };

        function setCurrentUser(user) {
            currentUser = user;
            store.set('user', user);
            return currentUser;
        };

        function getCurrentUser() {
            if (!currentUser) {
                currentUser = store.get('user');
            }
            return currentUser;
        };

        function addToken(config) {
          var storedToken = angular.fromJson($window.localStorage.getItem('ae.tooltip-editor.token'));
          var token;

          if (storedToken) {
            token = storedToken.token;
          }

          if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = 'Token ' + token;
          }

          return config;
        }

        function handleResponseError(rejection) {
          if (rejection.status === 400 || rejection.status < 403) {
            $log.warn(['AuthInterceptor', ['handleResponseError', rejection.status, 'NotAuthorized']]);
            $rootScope.$broadcast('unauthorized');
          }
          if (rejection.status === 500 || rejection.status < 502) {
            $log.warn(['AuthInterceptor', ['handleResponseError', rejection.status, 'NotAuthorized']]);
            $rootScope.$broadcast('unauthorized');
          }
            rejection.data = [];
            return rejection;
        }

        function handleRequestError(rejection) {
          $injector.get('$state').transitionTo('login');
          console.log('requestError');
          // do something on error
          return $q.reject(rejection);
        }
    }
})();
