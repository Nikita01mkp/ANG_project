
'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.Task2',
  'myApp.Task3',
  'myApp.Task1',
  'myApp.Task5',
  'myApp.Control',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  if(localStorage.getItem('UserRole') === null) {
    $routeProvider.otherwise({redirectTo: '/Task2'});
  }else{
    if(((localStorage.getItem('UserRole')) === 'User') || (localStorage.getItem('UserRole') === 'undefined')) {
      $routeProvider.otherwise({redirectTo: '/Task3'});
    }
    if((localStorage.getItem('UserRole')) === 'Admin') {
      $routeProvider.otherwise({redirectTo: '/ControlUser'});
    }

  }


}]);
