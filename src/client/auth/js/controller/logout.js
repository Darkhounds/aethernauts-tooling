module.exports = function($scope, session) {
    $scope.logout = function($event) {
        session.logout();
        $event.preventDefault();
    };
};
