module.exports  = function(session)                                                                                     {
    return {
        restrict:   'E',
        replace:    'true',
        template:   require('./../../html/template/sidemenu.jade'),
        controller: ['$scope', function($scope){
            $scope.session = session;

            $scope.$watch('session.profile', function(){
                console.log(session.profile);
            });
        }]
    };
};
