var gulp        = require("gulp");
var spawn       = require('child_process').spawn;
var browserify  = require('browserify')({debug: true});
var source      = require("vinyl-source-stream");
var buffer      = require('vinyl-buffer');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var sourcemaps  = require('gulp-sourcemaps');
var jade        = require('gulp-jade');
var minifyHTML  = require('gulp-minify-html');
var stylus      = require('gulp-stylus');
var htmlreplace = require('gulp-html-replace');

gulp.task('default', ['client-compile', 'server']);

gulp.task('server', ['client-compile'], function()                                                                      {
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

browserify.add('./src/client/bootstrap.js');
browserify.external(require.resolve('react', {expose: 'react'}));
browserify.require('./src/client/bootstrap.js');
browserify.require('react');

gulp.task('client', ['client-compile'], function()                                                                      {
    console.log("\n Watching Client code:\n");
    //
    gulp.watch('./src/client/**/*.*', ['client-compile'], function(){
        console.warn("\n --- Client code has been edited, recompiling...");
    });
});

gulp.task('client-compile', ['client-copy-html', 'client-compile-jade', 'client-compile-stylus'], function()            {
    browserify.bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/lib/application/'));
});

gulp.task('client-compile-jade', function()                                                                             {
    return gulp.src('./src/client/**/*.jade')
        .pipe(jade({locals: {}}))
        .pipe(gulp.dest('./public/'))
});

gulp.task('client-copy-html', function()                                                                                {
    return gulp.src('./src/client/**/*.html')
        .pipe(minifyHTML({
            conditionals:   true,
            spare:          true
        }))
        .pipe(gulp.dest('./public/'));
});

gulp.task('client-compile-stylus', ['client-stylus-sourcemaps'], function ()                                            {

});

gulp.task('client-stylus-sourcemaps', function ()                                                                       {
    return gulp.src('./src/client/**/*.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus({
            compress: true
        }))
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/css/'));
});

process.on('exit', function()                                                                                           {
    if (_server) _server.kill()
});

