/**
 * Created by kawnayeen on 1/31/17.
 */
(function () {
    "use strict";
    var gulp = require('gulp');
    var browserify = require('browserify');
    var babelify = require('babelify');
    var source = require('vinyl-source-stream');
    var uglify = require('gulp-uglify');
    var buffer = require('vinyl-buffer');

    gulp.task('js', () => {
        browserify('./js/src/app.js')
            .transform(babelify.configure({presets: ["es2015"]}))
            .bundle()
            .pipe(source('all.js'))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest('./js/build'));
    });

    gulp.task(
        'default',
        ['js'],
        () => gulp.watch('./js/src/app.js', ['js'])
    );
}());
