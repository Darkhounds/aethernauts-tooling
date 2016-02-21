module.exports = function($scope, $window, session) {
    $scope.login    = function($event){
        var popup       = $window.open('/auth/html/google-login.html', 'google-oauth', 'width=600,height=400');
        var timer       = setInterval(function(){
            if (!popup.closed) return;
            clearInterval(timer);
            session.check();
        }, 100);
        $event.preventDefault();
    };
};
