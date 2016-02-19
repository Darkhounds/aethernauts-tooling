module.exports  = function(session)                                                                                     {
    return {
        restrict:   'E',
        replace:    'true',
        template:   require('./../../html/template/menu.jade'),
        controller: ['$scope', '$window', '$timeout', function($scope, $window, $timeout){
            $scope.session = session;
            $scope.profile  = null;

            $scope.login    = function($event){
                var popup       = $window.open('/auth/html/google-login.html', 'google-oauth', 'width=600,height=400');
                var timer       = setInterval(function(){
                    if (!popup.closed) return;
                    clearInterval(timer);
                    session.check();
                }, 100);
                $event.preventDefault();
            };

            $scope.logout = function($event){
                session.logout();
                $event.preventDefault();
            };

            session.check();
        }]
    };
};
