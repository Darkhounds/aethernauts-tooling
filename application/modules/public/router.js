var router          = require('express').Router();
module.exports = new function(app){
    router.get('/about', function(req, res)                                                                             {
        res.send('About page...');
    });

    this.attachTo = function (app) { app.use('/', router);                                                              };
}();