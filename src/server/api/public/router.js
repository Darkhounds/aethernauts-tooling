var router      = require('express').Router();
module.exports  = new function()                                                                                        {
    this.attachTo   = function (app) { app.use('/', router);                                                            };
    //
    router.get('/api/about', function(req, res)                                                                             {
        res.send('About page...');
    });
}();