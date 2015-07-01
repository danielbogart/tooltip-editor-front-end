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
    'restangular'
  ])
  .config(function($stateProvider, $urlRouterProvider, $windowProvider, RestangularProvider) {

    // For any unmatched url, redirect to /portfolio
    $urlRouterProvider.otherwise('/main');

    // States
    $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: 'views/main.html',
      controller: 'mainController',
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html',
      controller: 'aboutController',
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'loginController',
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'views/contact.html',
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
  .run(function($rootScope, $state){
    $rootScope.$on('unauthorized', function() {
      // main.currentUser = UserService.setCurrentUser(null);
      $state.go('login');
    });
  });
