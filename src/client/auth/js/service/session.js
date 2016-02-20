module.exports  = function($http, $rootScope, $state, $location) {
    var _initialized = false;
    var _profile = null;
    Object.defineProperty(this, 'profile', {get: function() {return _profile; }});

    this.check = function(callback){
        $http({ method: 'GET', url: '/api/auth/profile'})
            .then(function (response) {
                _initialized = true;
                _profile = !response.data.error?response.data:null;
                _checkState();

                if (callback) callback(response.data.error, _profile);
            }, function (err) {
                if (callback) callback(err, response);
            });
    };

    this.logout = function(callback){
        $http({ method: 'GET', url: '/api/auth/logout'})
            .then(function (response) {
                _profile = null;
                _checkState();
                if (callback) callback(null);
            }, function (err) {
                if (callback) callback(err, response);
            });
    };

    $rootScope.$on('$locationChangeSuccess', function(e, nurl, ourl, nstate, ostate){
        _checkState();
    });

    function _checkState() {
        if (!_initialized) return;
        //
        if (!_profile && (!$state.current.name || $state.current.name != 'guest.dashboard')) $state.go('guest.dashboard');
        else if (_profile && (!$state.current.name || $state.includes('guest'))) $state.go('admin.dashboard');
        else if ($state.current) $location.path($state.href($state.current.name).substr(1));
    }

    this.check();

    return this;
};