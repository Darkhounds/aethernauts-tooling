var LocalStrategy   = require('passport-local').Strategy;
var GoogleStrategy  = require('passport-google-oauth').OAuth2Strategy;

module.exports = new function()                                                                                         {
    var strategyConfig = {
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    };
    //
    this.attachTo = function (passport)                                                                                 {
        passport.serializeUser(function(user, done)                                                                     {
            done(null, user.email);
        });
        //
        passport.deserializeUser(function(email, done)                                                                  {
            User.get(email, function(err, user)                                                                         {
                done(err, user);
            });
        });
        //
        passport.use('local-signup', new LocalStrategy(strategyConfig, function(req, email, password, callback)         {
            usersStoreFS.create(email, password, null, null, function(err, user)                                        {
                if (err === "exists") return callback(null, false, req.flash('signupMessage', 'That email is already taken.'));
                else if (err) return callback(error);
                callback(null, user);
            });
        }));
        //
        passport.use('local-login', new LocalStrategy(strategyConfig, function(req, email, password, callback)          {
            usersStoreFS.validate(email, password, function(err, user)                                                  {
                if (err === "notfound") return callback(null, false, req.flash('loginMessage', 'No user found.'));
                else if (err) return callback(error);
                else if (!user) return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                callback(null, user);
            });
        }));
    };
}();