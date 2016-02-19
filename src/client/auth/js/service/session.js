module.exports  = function($http) {

    var _profile = null;
    Object.defineProperty(this, 'profile', {get: function() {return _profile; }});

    this.check = function(callback){
        $http({ method: 'GET', url: '/api/auth/profile'})
            .then(function (response) {
                _profile = !response.data.error?response.data:null;
                callback(response.data.error, _profile);
            }, function (err) {
                callback(err, response);
            });
    };

    this.logout = function(callback){
        $http({ method: 'GET', url: '/api/auth/logout'})
            .then(function (response) {
                _profile = null;
                callback(null);
            }, function (err) {
                callback(err, response);
            });
    };

    return this;
};