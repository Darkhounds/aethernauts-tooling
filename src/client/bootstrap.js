var angular     = require('angular');
var uiRouter    = require('angular-ui-router');

var app         = angular.module('main-app', ['ui.router']);

// Core Module
app.factory('serverAPI', ['$http', require('./core/js/service/serverAPI')]);
app.directive('layout', require('./core/js/directive/layout'));

// Auth Module
app.factory('session', ['$http', '$rootScope', '$state', '$location', require('./auth/js/service/session')]);
app.config(['$stateProvider', require('./auth/config')]);

// Dashboard Module
app.config(['$stateProvider', require('./dashboard/config')]);

// Worlds Module
app.factory('worldsData', ['serverAPI', require('./worlds/js/service/worldsData')]);
app.directive('worldsList', ['worldsData', require('./worlds/js/directive/list')]);
app.config(['$stateProvider', require('./worlds/config')]);

