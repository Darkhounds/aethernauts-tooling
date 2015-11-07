var router          = require('express').Router();
var session         = require('express-session');
var passport        = require('passport');
//
var storeSessionFS  = require('./../../model/store-session-fs');
var strategies      = require('./strategies');
var authenticator   = require('./authenticator');
//
module.exports      = new function()                                                                                    {
    // -----------------------------------------------------------------------------------------------------------------
    // { region: Initialize
    //
    var _self           = this;
    //
    this.attachTo       = function (app) { app.use('/', router);                                                        };
    //
    var _sessionCfg     = {
        secret:             'somethingelse',
        store:              storeSessionFS,
        resave:             true,
        saveUninitialized:  true
    };
    //
    router.use(session(_sessionCfg));
    router.use(passport.initialize());
    router.use(passport.session());
    //
    strategies.attachTo(passport);
    strategies.modelUsers = _self.modelUsers;
    //
    // } endregion
    // -----------------------------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------------------------
    // { region: Login
    //
    router.get('/api/auth/googleauth', function(req, res, next) {
        authenticator(req, res, next, 'googleauth', function(err, user){
            res.setHeader('Content-Type', 'application/json');
            if (err) return res.send(err);
            //
            res.send({date: new Date().getTime(), success: user?true:false, message: user?'authentication succeeded':'authentication failed'});
        })
    });
    //
    // } endregion
    // -----------------------------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------------------------
    // { region: Resctricted
    //
    router.use('/api', function(req, res, next)                                                                         {
        res.setHeader('Content-Type', 'application/json');
        //
        if (!req.isAuthenticated()) return res.send({error: 'restricted Area'});
        //
        next();
    });
    router.use('/api/auth/profile', function(req, res, next)                                                            {
        res.send({data: req.user});
    });
    router.use('/api/auth/logout', function(req, res, next)                                                             {
        req.logout();
        res.send({data: 'Logged out'});
    });
    //
    // } endregion
    // -----------------------------------------------------------------------------------------------------------------
}();