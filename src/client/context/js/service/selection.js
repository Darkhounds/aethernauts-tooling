module.exports  = function($location) {

    var _area = null;
    Object.defineProperty(this, 'area', {
        get: function() {return _area; },
        set: function(v) {
            if (v === _area ) return;
            _area = v;
            _sub = null;
            _updateLocation();
        }
    });

    var _sub = null;
    Object.defineProperty(this, 'sub', {
        get: function() {return _sub; },
        set: function(v) {
            if (v === _sub ) return;
            _sub = v;
            _updateLocation();
        }
    });

    function _updateLocation() {

    }

    return this;
};