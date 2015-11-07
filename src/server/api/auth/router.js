var https           = require('https');
var url             = require('url');
var router          = require('express').Router();
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var session         = require('express-session');
var passport        = require('passport');
var flash           = require('connect-flash');
//
//var sessionStoreMem = require('./store-session-memory');
var authenticator   = require('./authenticator');
var sessionStoreFS  = require('./store-session-fs');
var usersStoreFS    = require('./store-users-fs');
var strategies      = require('./strategies');
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
    strategies.attachTo(passport);
    //
    router.get('/api/auth/googleauth', function(req, res, next) {
        authenticator(req, res, next, 'googleauth', function(err, user){
            if (err) return next(err);
            //
            res.setHeader('Content-Type', 'application/json');
            res.send({date: new Date().getTime(), success: user?true:false, message: user?'authentication succeeded':'authentication failed'});
        })
    });

    router.use('/api', function(req, res, next)                                                                         {
        console.log("--------> strategies::isLoggedIn", req.isAuthenticated());
        //
        res.setHeader('Content-Type', 'application/json');
        if (req.isAuthenticated()) return next();
        //
        res.send({error: 'restricted Area'});
    });

    router.use('/api/auth/logout', function(req, res, next)                                                             {
        req.logout();
        res.send({data: 'Logged out'});
    });

    router.use('/api/auth/profile', function(req, res, next)                                                            {

        res.send({data: req.user});
    });

    //router.get('/api/auth/googlesignin', function(req, res){
    //    var params = url.parse(req.url, true).query;
    //    console.log('1 -------->', params);
    //
    //    https.request({
    //        host: 'www.googleapis.com',
    //        path: '/plus/v1/people/me?access_token=' + params.access_token
    //    }, function(stream){
    //        var data = '';
    //        stream.on('data', function(chunk){ data += chunk; });
    //        stream.on('end', function(){
    //            console.log('2 -------->', data);
    //
    //            res.setHeader('Content-Type', 'application/json');
    //            res.send(data);
    //        })
    //    }).end();
    //
    //    //request('https://www.googleapis.com/plus/v1/people/me?access_token=' + params.access_token, function(event) {
    //    //    console.log("2 -->", event.target.readyState, event.target.responseText);
    //    //});
    //});
    //
    //router.get('/auth/login', passport.authenticate('google', { scope : ['profile', 'email'] }));
    //router.get('/auth/callback', passport.authenticate('google', {
    //    successRedirect : '/profile',
    //    failureRedirect : '/auth/login'
    //}));
    //
    //router.use(strategies.isLoggedIn, function(req, res, next)                                                          {
    //    next();
    //});
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    //router.get('/auth/profile', function(req, res)                                                                      {
    //    //res.render('profile.ejs', {
    //    //    user : req.user // get the user out of session and pass to template
    //    //});
    //});
    //
    // =====================================
    // LOGOUT ==============================
    // =====================================
    //router.get('/auth/logout', function(req, res)                                                                       {
    //    req.logout();
    //    res.redirect('/about');
    //});
}();