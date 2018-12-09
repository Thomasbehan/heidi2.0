'use strict';

angular.module('dashboardMdlApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.home', {
        url:'/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
    ;
  })
  .controller('HomeCtrl', function ($scope) {

  });
