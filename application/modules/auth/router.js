var router          = require('express').Router();
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var session         = require('express-session');
var passport        = require('passport');
var flash           = require('connect-flash');
//
var sessionStoreMem = require('./store-session-memory');
var sessionStoreFS  = require('./store-session-fs');
var usersStoreFS    = require('./store-users-fs');
var strategyGoogle  = require('./strategies');
//
module.exports = new function()                                                                                         {
    this.attachTo = function (app) { app.use('/', router);                                                              };
    //
    Object.defineProperty(this, 'dataFolder',{
        set: function(v)                                                                                                {
            sessionStoreFS.folder   = v + "/sessions";
            usersStoreFS.folder     = v + "/users";
        }
    });
    this.dataFolder                 = './data';
    //
    this.isLoggedIn = function(req, res, next)                                                                          {
        if (req.isAuthenticated()) return next();
        //
        res.redirect('/restricted');
    };
    //
    var _sessionCfg = {
        secret:             'somethingelse',
        store:              sessionStoreFS,
        resave:             true,
        saveUninitialized:  true
    };
    //
    router.use(cookieParser());
    router.use(bodyParser.urlencoded({extended: true}));
    router.use(bodyParser.json());
    router.use(session(_sessionCfg));
    router.use(passport.initialize());
    router.use(passport.session());
    router.use(flash());
    //
    strategyGoogle.attachTo(passport);
    //
    router.use(this.isLoggedIn, function(req, res, next)                                                                {
        console.log("Restricted area...");
        next();
    });
    //
    router.get('/auth/login', passport.authenticate('local-login',                                                      {
        //successRedirect : '/about', // redirect to the secure profile section
        //failureRedirect : '/about', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    //
    router.get('/auth/signup', passport.authenticate('local-signup',                                                    {
        //successRedirect : '/profile', // redirect to the secure profile section
        //failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    //
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    router.get('/auth/profile', function(req, res)                                                                      {
        //res.render('profile.ejs', {
        //    user : req.user // get the user out of session and pass to template
        //});
    });
    //
    // =====================================
    // LOGOUT ==============================
    // =====================================
    router.get('/auth/logout', function(req, res)                                                                       {
        //req.logout();
        //res.redirect('/');
    });
}();