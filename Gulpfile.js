'use strict';

var gulp    = require('gulp');
var sass    = require('gulp-sass');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');

var dir = {
    assets: './app/Resources/',
    dist: './web/',
    bower: './bower_components/',
    bootstrapJS: './bower_components/bootstrap-sass/assets/javascripts/bootstrap/'
};

gulp.task('sass', function() {
    gulp.src(dir.assets + 'style/main.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(dir.dist + 'css'));
});

gulp.task('scripts', function() {
    gulp.src([
            dir.bower + 'jquery/dist/jquery.min.js',
            dir.bower + 'jquery-ui/jquery-ui.min.js',
            // Bootstrap JS modules
            dir.bootstrapJS + 'transition.js',
            dir.bootstrapJS + 'collapse.js',
            dir.bootstrapJS + 'dropdown.js',
            dir.bootstrapJS + 'tooltip.js',
            dir.bootstrapJS + 'popover.js',
            //...
            // Nice select
            dir.assets + 'scripts/jquery.sticky.js',
            dir.assets + 'scripts/jquery.nice-select.min.js',
            // Main JS file
            dir.assets + 'scripts/main.js'
        ])
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dir.dist + 'js'));

    // Offers scripts
    gulp.src([
            dir.assets + 'scripts/offers.js'
        ])
        .pipe(uglify())
        .pipe(gulp.dest(dir.dist + 'js'));

    // Index search form script
    gulp.src([
        dir.assets + 'scripts/index-search.js'
        ])
        .pipe(uglify())
        .pipe(gulp.dest(dir.dist + 'js'));

    // Bootstrap file input plugin script
    gulp.src([

        './vendor/kartik-v/bootstrap-fileinput/js/fileinput.js',
        dir.assets + 'scripts/file-upload-plugin-translation.js'
    ])
        .pipe(concat('fileinput.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dir.dist + 'js'));

    // Bootstrap file input plugin translation
    gulp.src([
        './vendor/kartik-v/bootstrap-fileinput/js/fileinput.js'
    ])
        .pipe(uglify())
        .pipe(gulp.dest(dir.dist + 'js'))
});

gulp.task('images', function() {
    gulp.src([
            dir.assets + 'images/**'
        ])
        .pipe(gulp.dest(dir.dist + 'images'));
});

gulp.task('fonts', function() {
    gulp.src([
        dir.bower + 'bootstrap-sass/assets/fonts/**'
        ])
        .pipe(gulp.dest(dir.dist + 'fonts'));
});

gulp.task('default', ['sass', 'scripts', 'fonts', 'images']);
