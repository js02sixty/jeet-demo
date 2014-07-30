// Gulpfile.js
// Require the needed packages
var gulp = require('gulp');
var connect = require('gulp-connect');
var stylus = require('gulp-stylus');
var cssmin = require('gulp-minify-css');
var rename = require('gulp-rename');

// Stylus Imports
var nib = require('nib');
var jeet = require('jeet');
var rupture = require('rupture');

// Path Information

var styleIn = ['./stylus/style.styl', './stylus/new.styl'];
var styleOut = './css';
var htmlIn = '*.html'

gulp.task('websrv', function () {
    connect.server({
        livereload: true,
        host: '0.0.0.0'
    });
});

gulp.task('html', function () {
    gulp.src(htmlIn)
        .pipe(connect.reload());
});

// Compile CSS
gulp.task('stylus', function () {
    gulp.src(styleIn)
        .pipe(stylus({
            use: [
                nib(),
                jeet(),
                rupture()
            ],
            errors: true,
            linenos: false
        }))
        .pipe(gulp.dest(styleOut))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssmin())
        .pipe(gulp.dest(styleOut))
        .pipe(connect.reload());
});


gulp.task('watch', function () {
    gulp.watch(htmlIn, ['html']);
    gulp.watch(styleIn, ['stylus']);
});

// Default gulp task to run
gulp.task('default', ['websrv', 'stylus', 'watch']);
