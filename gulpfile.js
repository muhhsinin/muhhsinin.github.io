/**
 * Created by kawnayeen on 1/31/17.
 */
(function () {
    "use strict";
    const gulp = require('gulp');
    const browserify = require('browserify');
    const babelify = require('babelify');
    const source = require('vinyl-source-stream');
    const uglify = require('gulp-uglify');
    const buffer = require('vinyl-buffer');
    const mocha = require('gulp-mocha');
    const connect = require('gulp-connect');

    gulp.task('connect', () => connect.server({
        base: 'http://localhost',
        port: 9000,
        livereload: true
    }));

    gulp.task('js', ['test'], () => {
        browserify('./js/src/prod/app.js')
            .transform(babelify.configure({presets: ["es2015"]}))
            .bundle()
            .pipe(source('all.js'))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest('./js/build'))
            .pipe(connect.reload());
    });

    gulp.task('test', () => {
        return gulp.src('./js/src/test/**/**.js', {read: false})
            .pipe(mocha({reporter: 'spec'}));
    });

    gulp.task(
        'default',
        ['connect', 'js'],
        () => {
            gulp.watch('./js/src/prod/**/**.js', ['js']);
        }
    );
}());
