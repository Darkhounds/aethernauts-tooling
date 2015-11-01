var router          = require('express').Router();
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var session         = require('express-session');
var memStore        = require('./session-store-memory');
var fsStore         = require('./session-store-fs');
var path            = require('path');
var passport        = require('passport');
var GoogleStrategy  = require('passport-google-oauth').OAuth2Strategy;


module.exports = new function(app)                                                                                      {
    fsStore.folder = path.resolve(__dirname + "../../../../data/sessions");

    var _sessionCfg = {
        secret:             'somethingelse',
        store:              fsStore,
        resave:             true,
        saveUninitialized:  true
    };

    router.use(function(req, res, next){
        console.log("Restricted area...");
        next();
    });

    router.use(cookieParser());
    router.use(bodyParser.urlencoded({extended: true}));
    router.use(bodyParser.json());
    router.use(session(_sessionCfg));
    router.use(passport.initialize());
    router.use(passport.session());

    router.get('/', function(req, res)                                                                                  {
        console.log("Dooiiisss");
        res.send('Root page...');
    });

    this.attachTo = function (app) { app.use('/', router);                                                              };
}();