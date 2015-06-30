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
  .config(function($stateProvider, $urlRouterProvider, RestangularProvider) {

    // For any unmatched url, redirect to /portfolio
    $urlRouterProvider.otherwise('/main');

    // States
    $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl',
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
  });
