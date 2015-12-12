var express             = require('express');
var app                 = express();
var cookieParser        = require('cookie-parser');
var bodyParser          = require('body-parser');
var path                = require('path');
var storeSessionFS      = require('./model/store-session-fs');
var storeUsersFS        = require('./model/store-users-fs');
var arguments           = require('./utils/arguments');

var dataPath            = path.resolve(__dirname + '/../../data');
storeSessionFS.folder   = dataPath + "/sessions";
storeUsersFS.folder     = dataPath + "/users";

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./logging/router').attachTo(app);

app.use(express.static(path.resolve(__dirname + '/../../public')));

require('./api/public/router').attachTo(app);
require('./api/auth/router').attachTo(app);

var server = app.listen(arguments.get('port', 80), arguments.get('ip', '0.0.0.0'), function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening at http://%s:%s', host, port);
});