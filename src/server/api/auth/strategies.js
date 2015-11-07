var https           = require('https');
var url             = require('url');
var usersStoreFS    = require('./../../model/store-users-fs');
var CustomStrategy  = require('passport-custom').Strategy;

module.exports = new function()                                                                                         {
    var _self = this;
    //
    this.attachTo = function (passport)                                                                                 {
        // -------------------------------------------------------------------------------------------------------------
        // { region: Shared Stuff
        //
        passport.serializeUser(function(user, done)                                                                     {
            done(null, user.email);
        });
        //
        passport.deserializeUser(function(email, done)                                                                  {
            usersStoreFS.get(email, function(err, user)                                                                 {
                done(err, user);
            });
        });
        //
        // } endregion
        // -------------------------------------------------------------------------------------------------------------
        // -------------------------------------------------------------------------------------------------------------
        // { region: Google OAuth
        //
        passport.use('googleauth', new CustomStrategy(function(req, callback)                                           {
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
                    _registerGoogleUser(email, data, function(err, user)                                                {
                        if (err) return callback(err);
                        callback(null, user);
                    });
                });
            });
        }));
        //
        function _registerGoogleUser(email, data, callback)                                                             {
            var user = {
                email:      email,
                firstName:  data.name?data.name.givenName:email.substr(0, email.indexOf('@')),
                lastName:   data.name?data.name.familyName:'',
                logo:       data.image?data.image.url:'',
                googleID:   data.id
            };
            usersStoreFS.create(email, user, callback);
        }
        //
        function _requestGoogleProfile(token, callback)                                                                 {
            https.request({
                host: 'www.googleapis.com',
                path: '/plus/v1/people/me?access_token=' + token
            }, function(stream){
                var data = '';
                stream.on('data', function(chunk){ data += chunk; });
                stream.on('end', function() {
                    try {
                        parsedData = JSON.parse(data);
                        callback(parsedData.error?parsedData:null, parsedData.error?null:parsedData);
                    } catch (e) {
                        callback(data);
                    }
                });
            }).end();
        }
        //
        // } endregion
        // -------------------------------------------------------------------------------------------------------------
    };
}();