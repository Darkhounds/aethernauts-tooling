var passport        = require('passport');

module.exports = function(req, res, next, strategy, callback)                                                           {
    passport.authenticate(strategy, function(err, user, info)                                                           {
        if (err) return callback(err);

        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return callback(err, user);
        });
    })(req, res, next);
};