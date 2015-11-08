module.exports  = function($http) {

    var _session = null;
    Object.defineProperty(this, 'session', {get: function() {return _session; }});

    this.check = function(callback){
        $http({ method: 'GET', url: '/api/auth/profile'})
            .then(function (response) {
                _session = !response.data.error?response.data:null;
                callback(response.data.error, _session);
            }, function (err) {
                callback(err, response);
            });
    };

    this.logout = function(callback){
        $http({ method: 'GET', url: '/api/auth/logout'})
            .then(function (response) {
                _session = null;
                callback(null);
            }, function (err) {
                callback(err, response);
            });
    };

    return this;
};