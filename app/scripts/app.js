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
    'ui.router'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

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
  });
