/*
 * Gulp Workflow Script
 *
 * This document contains all of the custom scripts for the project's Gulp
 * powered automation workflow.
 */

// Require Plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var cache = require('gulp-cache');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();
var del = require('del');

// Task to Process Styles
gulp.task('styles', function(){
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Task to Process HTML
gulp.task('html', function(){
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

// Task to Lint Scripts
gulp.task('lint', function() {
  return gulp.src('js/main.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default', {verbose: true}));
});

// Task to Process Scripts
gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});

// Task to Process Imagse
gulp.task('images', function(){
  return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin()))
  .pipe(gulp.dest('dist/img'))
});

// Task to Clean Files
gulp.task('clean', function() {
	return del(['dist/css', 'dist/js', 'dist/img']);
});

// Task to Sync Browsers
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
});

// Setup Watch Task
gulp.task('watch', ['browserSync', 'styles', 'html', 'lint', 'scripts', 'images'], function (){
  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch('src/*.html', ['html', browserSync.reload]);
  gulp.watch('src/js/**/*.js', ['scripts', browserSync.reload]);
  gulp.watch('src/img/**/*.+(png|jpg|jpeg|gif|svg)', ['images', browserSync.reload]);
});

// Setup Default Task
gulp.task('default', ['watch']);
