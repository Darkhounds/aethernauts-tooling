var gulp        = require("gulp");
var spawn       = require('child_process').spawn;
var browserify  = require('browserify');
var jadeify     = require('jadeify');
var rename      = require('gulp-rename');
var source      = require("vinyl-source-stream");
var buffer      = require('vinyl-buffer');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var sourcemaps  = require('gulp-sourcemaps');
var streamify   = require('gulp-streamify');
var jade        = require('gulp-jade');
var minifyHTML  = require('gulp-minify-html');
var stylus      = require('gulp-stylus');
var exorcist    = require('exorcist');

gulp.task('default', ['server']);

gulp.task('server', function()                                                                                          {
    console.log("\n Watching gulpfile.js and Server code:\n");
    //
    gulp.watch(['gulpfile.js'], function()                                                                              {
        console.warn("\n --- Gulp has been edited, please rerun it!\n");
        process.exit(0)
    });
    //
    gulp.watch(['./src/server/**/*.js'], function()                                                                     {
        console.warn("\n --- Server code has been edited, restarting the server...");
        _startServer()
    });
    //
    _startServer();
});

gulp.task('server-start', function()                                                                                    {
    _startServer()
});

var _server = null;
function _startServer()                                                                                                 {
    if (_server) _server.kill();
    _server = spawn('node', ['src/server/run.js'], {stdio: [0, 1, 2]});
    _server.on('close', function (code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
}

gulp.task('client', ['client-compile', 'client-copy-html', 'client-compile-jade', 'client-compile-stylus'], function()  {
    console.log("\n Watching Client code:\n");
    //
    return gulp.watch('./src/client/**/*.*', ['client-compile', 'client-copy-html', 'client-compile-jade', 'client-compile-stylus'], function(){
        console.warn("\n --- Client code has been edited, recompiling...");
    });
});

gulp.task('client-compile', function(){
    var bundler = browserify('./src/client/bootstrap.js', {debug:true, insertGlobals:true});
    bundler.transform(jadeify);

    return bundler.bundle()
        .pipe(exorcist('./public/lib/application/main.js.map'))
        .pipe(source('main.js'))
        .pipe(gulp.dest('./public/lib/application/'));
});

gulp.task('client-copy-html', function()                                                                                {
    return gulp.src('./src/client/**/*.html')
        .pipe(minifyHTML({
            conditionals:   true,
            spare:          true
        }))
        .pipe(gulp.dest('./public/'));
});

gulp.task('client-compile-jade', function()                                                                             {
    return gulp.src(['./src/client/**/*.jade', '!**/part/*.*'])
        .pipe(jade({locals: {}}))
        .pipe(gulp.dest('./public/'))
});

gulp.task('client-compile-stylus', function ()                                                                          {
    return gulp.src(['./node_modules/bootstrap-styl/bootstrap/index.styl', './src/client/core/css/layout.styl'])
        .pipe(sourcemaps.init())
        .pipe(stylus({
            compress: true,
            paths: ['./node_modules/bootstrap-styl/', './src/client/']
        }))
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/css/'));
});

process.on('exit', function()                                                                                           {
    if (_server) _server.kill()
});
