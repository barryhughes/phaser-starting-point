const { dest, series, src, parallel } = require( 'gulp' );

const babel = require('gulp-babel');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const minifyHtml = require('gulp-htmlmin');
const minifyJS = require('gulp-uglify');
const watch = require('gulp-watch');
const webserver = require('gulp-webserver');

function cleanOutputDir() {
    return src('out', {read: false})
        .pipe(clean());
}

function buildHtml() {
    return src('src/html/*.html')
        .pipe(minifyHtml({ collapseWhitespace: true }))
        .pipe(dest('out'));
}

function dependencies() {
    let dependencies = [
        'node_modules/phaser/dist/phaser.min.js',
        'node_modules/phaser/dist/phaser-arcade-physics.min.js',
    ];

    return src( dependencies )
        .pipe(dest('out'));
}

function buildJS() {
    return src('src/js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(babel())
        .pipe(minifyJS())
        .pipe(dest('out'));
}

function serve() {
    return src('out')
        .pipe(webserver({
            livereload: true,
            open: true,
        }));
}

function watchJS() {
    return watch('src/js/**/*.js', parallel(buildJS));
}

exports.buildjs = parallel(dependencies, buildJS);
exports.all = series(cleanOutputDir, buildHtml, exports.buildjs, serve);
exports.default = series(cleanOutputDir, buildHtml, exports.buildjs);
exports.serve = serve;
exports.watch = watchJS;
