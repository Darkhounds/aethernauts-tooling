var router      = require('express').Router();
module.exports  = new function()                                                                                        {
    this.attachTo   = function (app) { app.use('/', router);                                                            };
    //
    router.get('/about', function(req, res)                                                                             {
        res.send('About page...');
    });
    //
    router.get('/restricted', function(req, res)                                                                        {
        res.send('Area restricted!');
    });
}();