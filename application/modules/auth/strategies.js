//var LocalStrategy   = require('passport-local').Strategy;
var GoogleStrategy  = require('passport-google-oauth').OAuth2Strategy;
var usersStoreFS    = require('./store-users-fs');

module.exports = new function()                                                                                         {
    //GoogleStrategy.prototype.userProfile = function(token, done) {
    //    done(null, {})
    //};

    var strategyConfig = {
        usernameField:      'email',
        passwordField:      'password',
        passReqToCallback:  true
    };
    //
    var googleConfig    = {
        clientID :          '619853354672-3d3g3geh9banql1048hmoaguhu5fegmm.apps.googleusercontent.com',
        clientSecret:       'JKYCSLyBs1SF55-Gsd2QAZxg',
        callbackURL :       'http://localhost/auth/callback'
    };
    //
    this.attachTo = function (passport)                                                                                 {
        passport.serializeUser(function(user, done)                                                                     {
            console.log("--------> strategies::serializeUser", user.emails[0].value);
            done(null, user.emails[0].value);
        });
        //
        passport.deserializeUser(function(email, done)                                                                  {
            console.log("--------> strategies::deserializeUser", email);
            usersStoreFS.get(email, function(err, user)                                                                 {
                done(err, user);
            });
        });
        //
        // =========================================================================
        // GOOGLE ==================================================================
        // =========================================================================
        passport.use(new GoogleStrategy(googleConfig, function(token, refreshToken, profile, callback)                  {
            var email = profile.emails[0].value;
            console.log("--------> strategies::GoogleStrategy", email);
            //
            usersStoreFS.get(email, function(err, user)                                                                 {
                if (err) return callback(err);
                else if (user) return callback(null, user);
                else usersStoreFS.create(email, token, profile._json, function(err, user)                               {
                    if (err) return callback(err);
                    callback(null, user);
                });
            });
        }));
    };
    //
    this.isLoggedIn = function(req, res, next)                                                                          {
        console.log("--------> strategies::isLoggedIn", req.isAuthenticated());
        //
        if (req.isAuthenticated()) return next();
        //
        res.redirect('/restricted');
    };
    //
}();