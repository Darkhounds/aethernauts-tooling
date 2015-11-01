var router      = require('express').Router();
module.exports  = new function()                                                                                        {
    this.attachTo   = function (app) { app.use('/', router);                                                            };
    //
    router.use(function timeLog(req, res, next)                                                                         {
        console.log('Time: ', new Date().toUTCString().slice(0, -4), req.originalUrl);
        next();
    });
}();