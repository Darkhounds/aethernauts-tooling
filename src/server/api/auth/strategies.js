//var LocalStrategy   = require('passport-local').Strategy;
//var PassportHTTP    = require('passport-http').DigestStrategy;
//var GoogleStrategy  = require('passport-google-oauth').OAuth2Strategy;
var https           = require('https');
var url             = require('url');
var CustomStrategy  = require('passport-custom').Strategy;
var usersStoreFS    = require('./store-users-fs');

module.exports = new function()                                                                                         {
    var _self = this;
    //
    this.attachTo = function (passport)                                                                                 {
        passport.serializeUser(function(user, done)                                                                     {
            console.log("--------> strategies::serializeUser", user.email);
            done(null, user.email);
        });
        //
        passport.deserializeUser(function(email, done)                                                                  {
            console.log("--------> strategies::deserializeUser", email);
            usersStoreFS.get(email, function(err, user)                                                                 {
                done(err, user);
            });
        });

        // =========================================================================
        // GOOGLE ==================================================================
        // =========================================================================
        passport.use('googleauth', new CustomStrategy(function(req, callback) {
            var params = url.parse(req.url, true).query;
            // Request user profile from google
            _requestGoogleProfile(params.access_token, function(err, data)                                              {
                // Something went wrong with the request:
                if (err) return callback(err);

                // Grab account email:
                var email = '';
                for (var i in data.emails) if (data.emails[i].type === 'account')                                       {
                    email = data.emails[0].value;
                    break;
                }

                // No email found on this profile so cant authenticate...
                if (!email) return callback(null, false);

                // Look for existing use with this email:
                usersStoreFS.get(email, function(err, user)                                                             {
                    // Something went wrong with the store:
                    if (err) return callback(err);

                    // User already exist:
                    if (user) return callback(null, user);

                    // Create new user with this email:
                    _registerUser(email, data, function(err, user)                                                      {
                        if (err) return callback(err);
                        callback(null, user);
                    })
                });
            });
        }));

        function _registerUser(email, data, callback)                                                                   {
            var user = {
                email:      email,
                firstName:  data.name?data.name.givenName:email.substr(0, email.indexOf('@')),
                lastName:   data.name?data.name.familyName:'',
                logo:       data.image?data.image.url:'',
                googleID:   data.id
            };
            usersStoreFS.create(email, user, callback);
        }

        function _requestGoogleProfile(token, callback){
            https.request({
                host: 'www.googleapis.com',
                path: '/plus/v1/people/me?access_token=' + token
            }, function(stream){
                var data = '';
                stream.on('data', function(chunk){ data += chunk; });
                stream.on('end', function() {
                    try {
                        callback(null, JSON.parse(data));
                    } catch (e) {
                        callback(data);
                    }
                });
            }).end();
        }
    };
    //
    //this.isLoggedIn = function(req, res, next)                                                                          {
    //    console.log("--------> strategies::isLoggedIn", req.isAuthenticated());
    //    //
    //    if (req.isAuthenticated()) return next();
    //    //
    //    res.redirect('/restricted');
    //};
    ////
}();