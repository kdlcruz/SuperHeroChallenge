'use strict';

function run($ionicPlatform, MarvelApi, $rootScope) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}

function config($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'template/home.html'
    })
    .state('game', {
      url: '/game',
      templateUrl: 'template/game.html',
      controller: 'GameController'
    });

};

angular.module('SuperHeroChallenge.widgets', [])
  .directive('coverImage', coverImage);

angular.module('SuperHeroChallenge', [
    'ionic',
    'SuperHeroChallenge.widgets'
  ])

  .run(run)
  .config(config)

  .controller('GameController', GameController)
  .factory('MarvelApi', MarvelApi)
  .factory('HeroChallenge', HeroChallenge);

