function _initialize(instance) {
    var pairs           = process.argv.slice(2);
    for (var i in pairs) {
        var pair = pairs[i].split("=");
        if (pair[0][0] !== '-') continue;
        //
        Object.defineProperty(instance, pair[0].substr(1), {value: pair[1]});
    }
}

var Arguments       = function() {
    _initialize(this);
};

Arguments.prototype.get = function get (name, def) {
    return this.hasOwnProperty(name)?this[name]:def
};

module.exports      = new Arguments();