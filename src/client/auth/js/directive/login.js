module.exports  = function(session)                                                                                     {
    return {
        restrict:   'E',
        replace:    'true',
        template:   require('./../../html/template/menu.jade'),
        controller: ['$scope', '$window', '$timeout', function($scope, $window, $timeout){
            $scope.profile  = null;

            $scope.login    = function($event){
                var popup       = $window.open('/auth/html/google-login.html', 'google-oauth', 'width=600,height=400');
                var timer       = setInterval(function(){
                    if (!popup.closed) return;
                    clearInterval(timer);
                    _checkSession();
                }, 100);
                $event.preventDefault();
            };

            $scope.logout = function($event){
                session.logout(function(err, data){
                    $timeout(function() { $scope.profile = null; })
                });
                $event.preventDefault();
            };

            function _checkSession()                                                                                    {
                session.check(function(err, data){
                    $timeout(function() { $scope.profile = !err?data:null; });
                });
            }
            _checkSession();
        }]
    };
};
