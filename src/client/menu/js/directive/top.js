module.exports  = function() {
    return {
        restrict:   'E',
        replace:    'true',
        template:   require('./../../html/template/top.jade'),
        controller: ['$scope', function($scope){

        }]
    };
};
