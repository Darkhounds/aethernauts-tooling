var angular     = require('angular');
var uiRouter    = require('angular-ui-router');

var app         = angular.module('main-app', ['ui.router']);

// Auth Module
app.factory('session', ['$http', '$rootScope', '$state', '$location', require('./auth/js/service/session')]);
app.config(['$stateProvider', require('./areas/auth/config')]);

// Core Module
app.factory('serverAPI', ['$http', require('./core/js/service/serverAPI')]);
app.directive('layout', require('./core/js/directive/layout'));

// Dashboard Module
app.config(['$stateProvider', require('./areas/dashboard/config')]);

// Worlds Module
app.factory('worldsData', ['serverAPI', require('./areas/worlds/js/service/worldsData')]);
app.directive('worldsList', ['worlds', require('./areas/worlds/js/directive/list')]);
app.config(['$stateProvider', require('./areas/worlds/config')]);

