module.exports  = function(worldsData) {
    return {
        restrict:   'E',
        replace:    'true',
        template:   require('./../../html/template/list.jade'),
        controller: ['$scope', function($scope){
            $scope.worldsData = worldsData;
        }]
    };
};
