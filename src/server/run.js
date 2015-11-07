var express             = require('express');
var app                 = express();
var path                = require('path');

var loggingRouter       = require('./logging/router');
loggingRouter.attachTo(app);

app.use(express.static(path.resolve(__dirname + '/../../public')));

var publicRouter        = require('./api/public/router');
publicRouter.attachTo(app);

var authRouter          = require('./api/auth/router');
authRouter.dataFolder   = path.resolve(__dirname + '/../../data');
authRouter.attachTo(app);

var server = app.listen(80, '0.0.0.0', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening at http://%s:%s', host, port);
});