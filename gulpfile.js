var gulp    = require("gulp");
var spawn   = require('child_process').spawn;


gulp.task('default', function() {
    console.log("\n Watching gulpfile.js and Server code:\n");
    //
    gulp.watch(['gulpfile.js'], function() {
        console.warn("\n --- Gulp has been edited, please rerun it!\n");
        process.exit(0)
    });
    //
    gulp.watch(['./application/**/*.js'], function() {
        console.warn("\n --- Server code has been edited, restarting the server...");
        _startServer()
    });
    //
    _startServer();
});

gulp.task('server-start', function() {
    _startServer()
});


var _server = null;
function _startServer(){
    if (_server) _server.kill();
    _server = spawn('node', ['application/bootstrap.js'], {stdio: [0, 1, 2]});
    _server.on('close', function (code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
}

process.on('exit', function() {
    if (_server) _server.kill()
});

