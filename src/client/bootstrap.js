var angular     = require('angular');
var uiRouter    = require('angular-ui-router');

var app         = angular.module('main-app', ['ui.router']);

app.factory('session', ['$http', require('./auth/js/service/session')]);
app.factory('selection', ['$location', require('./context/js/service/selection')]);

app.directive('layout', require('./core/js/directive/layout'));
app.directive('menuTop', ['session', require('./menu/js/directive/top')]);
app.directive('menuSide', ['session', require('./menu/js/directive/side')]);
app.directive('contextCenter', ['$state', require('./context/js/directive/center')]);

app.config(['$stateProvider', '$urlRouterProvider', require('./areas/dashboard/config')]);
app.config(['$stateProvider', require('./areas/worlds/config')]);
