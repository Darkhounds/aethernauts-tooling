var app             = require('express')();

require('./modules/logging/router').attachTo(app);
require('./modules/public/router').attachTo(app);
require('./modules/auth/router').attachTo(app);

var server = app.listen(80, '0.0.0.0', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening at http://%s:%s', host, port);
});