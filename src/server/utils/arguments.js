function _initialize(instance) {
    var pairs           = process.argv.slice(2);
    for (var i in pairs) {
        var pair = pairs[i].split("=");
        if (pair[0][0] === '-') instance[pair[0].substr(1)] = pair[1];
    }
}

var Arguments       = function() {
    _initialize(this);
};

Arguments.prototype.get = function get (name, def) {
    return arguments.hasOwnProperty(name)?arguments[name]:def
};

module.exports      = new Arguments();