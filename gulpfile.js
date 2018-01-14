require('dotenv').config();

const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const del = require('del');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const workbox = require('workbox-build');
const $ = gulpLoadPlugins();

// Creates a new build in the dist directory
gulp.task('build', (cb) => {
    return runSequence(
        'clean',
        'dist',
        cb
    );
});

// The default development task
gulp.task('development', ['dist'], () => {
    browserSync.init({
        server: './dist',
        watchEvents: ['add', 'change', 'addDir'],
        cors: true,
        files: ['src/**'],
        ui: false,
    });


    gulp.watch('src/**/*.html').on('change', browserSync.reload);
    gulp.watch(['src/**', 'src/**/*.html'], ['copy']);
});

// Clear the dist directory
gulp.task('clean', () => {
    return del(['dist/']);
});

// Creates all the neccecary source files
gulp.task('dist', () => {
    return runSequence(
        'copy',
        'key',
        'sw',
    );
});

// Insert the Google Api key into the HTML Documents
gulp.task('key', () => {
    return gulp.src(['src/**/*.html'])
        .pipe($.compileHandlebars({
            'GOOGLE_APIKEY': process.env.GOOGLE_APIKEY,
        }))
        .pipe(gulp.dest('dist/'));
});

// Copy all the source files into the dist directory, that have changed
gulp.task('copy', () => {
    return gulp.src([
        'src/**/*',
        'src/**/*.html',
    ]).pipe($.changed('dist'))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('sw', () => {
    return workbox.generateSW({
        globDirectory: 'dist/',
        globPatterns: ['**\/*.{html,js,css,json,jpg}'],
        swDest: `dist/sw.js`,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [{
            urlPattern: /.*/,
            handler: 'fastest',
        }],
    }).then(() => {
        console.info('Service worker generation completed.');
    }).catch((error) => {
        console.warn('Service worker generation failed: ' + error);
    });
});