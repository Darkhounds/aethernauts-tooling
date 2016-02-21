module.exports  = function(worlds) {
    return {
        restrict:   'E',
        replace:    'true',
        template:   require('./../../html/template/list.jade'),
        controller: ['$scope', function($scope){
            $scope.worlds = worlds;
        }]
    };
};
