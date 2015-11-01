var router          = require('express').Router();
//var cookieParser    = require('cookie-parser');
//var bodyParser      = require('body-parser');
//var session         = require('express-session');
//var passport        = require('passport');
//var GoogleStrategy  = require('passport-google-oauth').OAuth2Strategy;


//app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser()); // get information from html forms
//app.use(session({ secret: 'somethingelse' })); // session secret
//app.use(passport.initialize());
//app.use(passport.session()); // persistent login sessions

module.exports = new function(app){
    router.use(function timeLog(req, res, next) {
        console.log('Time: ', new Date().toUTCString().slice(0, -4), req.originalUrl);
        next();
    });

    router.get('/', function(req, res) {
        res.send('Root page...');
    });

    router.get('/about', function(req, res) {
        res.send('About page...');
    });

    this.attachTo = function (app) {
        app.use('/', router);
    };
}();