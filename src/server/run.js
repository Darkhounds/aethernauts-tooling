var express             = require('express');
var app                 = express();
var path                = require('path');

app.set('views', path.resolve(__dirname + '/views'));
app.set('view engine', 'jade');
app.use(express.static(path.resolve(__dirname + '/../../public')));

var loggingRouter       = require('./modules/logging/router');
loggingRouter.attachTo(app);

var publicRouter        = require('./modules/public/router');
publicRouter.attachTo(app);

var authRouter          = require('./modules/auth/router');
authRouter.dataFolder   = path.resolve(__dirname + '/../../data');
authRouter.attachTo(app);

var server = app.listen(80, '0.0.0.0', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening at http://%s:%s', host, port);
});