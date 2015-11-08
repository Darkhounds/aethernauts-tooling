var angular     = require('angular');

var app         = angular.module('myApp', []);

app.factory('session', ['$http', require('./auth/js/service/session')]);

app.directive('layout', require('./core/js/directive/layout'));
app.directive('login', ['session', require('./auth/js/directive/login')]);

