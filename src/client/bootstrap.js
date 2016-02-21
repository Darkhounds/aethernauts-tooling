var angular     = require('angular');
var uiRouter    = require('angular-ui-router');

var app         = angular.module('main-app', ['ui.router']);

app.factory('session', ['$http', '$rootScope', '$state', '$location', require('./auth/js/service/session')]);
app.factory('worlds', ['$http', require('./comms/js/service/worlds')]);

app.directive('layout', require('./core/js/directive/layout'));

app.config(['$stateProvider', require('./areas/auth/config')]);
app.config(['$stateProvider', require('./areas/dashboard/config')]);
app.config(['$stateProvider', require('./areas/worlds/config')]);
