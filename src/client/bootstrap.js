var angular     = require('angular');

var app         = angular.module('myApp', []);

app.factory('session', ['$http', require('./auth/js/service/session')]);

app.directive('layout', require('./core/js/directive/layout'));
app.directive('menuTop', ['session', require('./menu/js/directive/top')]);
app.directive('menuSide', ['session', require('./menu/js/directive/side')]);

