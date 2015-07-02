'use strict';

/**
 * @ngdoc overview
 * @name tooltipEditorFrontEndApp
 * @description
 * # tooltipEditorFrontEndApp
 *
 * Main module of the application.
 */
angular
  .module('tooltipEditorFrontEndApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'restangular',
    'ui.bootstrap'
  ])
  .config(function($stateProvider, $urlRouterProvider, $windowProvider, RestangularProvider) {

    // For any unmatched url, redirect to /portfolio
    $urlRouterProvider.otherwise('/login');

    // States
    $stateProvider
    .state('root',{
      url: '',
      abstract: true,
      views: {
        'header': {
          templateUrl: 'views/header.html',
          controller: 'headerController'
        }
      }
    })
    .state('root.main', {
      url: '/main',
      views: {
        'container@': {
          templateUrl: 'views/main.html',
          controller: 'mainController',
        }
      },
      data: {
        requiredAuthentication: true
      },
    })
    .state('root.about', {
      url: '/about',
      views: {
        'container@': {
          templateUrl: 'views/about.html',
          controller: 'aboutController',
        }
      }
    })
    .state('root.login', {
      url: '/login',
      views: {
        'container@': {
          templateUrl: 'views/login.html',
          controller: 'loginController',
        }
      }
    })
    .state('root.contact', {
      url: '/contact',
      views: {
        'container@': {
          templateUrl: 'views/contact.html',
        }
      }
    });

    RestangularProvider.setBaseUrl('http://localhost:3000');

    RestangularProvider.setRequestInterceptor(function(elem, operation, what) {

      if (operation === 'put') {
        elem._id = undefined;
        return elem;
      }
      return elem;
    })
  })
  .run(Run);

    Run.$inject=['$rootScope','$state', 'loggedInService'];

      function Run($rootScope, $state, loggedInService) {
        $rootScope.$on('$stateChangeStart', function (e, toState) {

          if (!(toState.data)) {
            return;
          }
          if (!(toState.data.requiredAuthentication)){
            return;
          }
          var _requiredAuthentication = toState.data.requiredAuthentication;
          if (_requiredAuthentication && !loggedInService.checkUser()) {
              e.preventDefault();
              $state.go('root.login', {notify: false});
              alert('please log in first');
          }
          return;
        });
      }
