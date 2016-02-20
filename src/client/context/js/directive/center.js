module.exports  = function($state) {
    return {
        restrict:   'E',
        replace:    'true',
        template:   require('./../../html/template/center.jade'),
        controller: ['$scope', function($scope){
            //$scope.selection = selection;

        }]
    };
};
