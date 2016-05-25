// Require Plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var browserSync = require('browser-sync').create();

// Compile Sass Code
gulp.task('sass', function(){
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Minify HTML Code
gulp.task('htmlmin', function(){
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

// Minify JavaScript
gulp.task('uglify', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});

// Compress Images
gulp.task('imagemin', function(){
  return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin()))
  .pipe(gulp.dest('dist/img'))
});

// Clean Files
gulp.task('clean', function() {
	return del(['dist/css', 'dist/js', 'dist/img']);
});

// Setup Browser Syncing
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
});

// Setup Watch Task
gulp.task('watch', ['browserSync', 'sass', 'htmlmin', 'uglify', 'imagemin'], function (){
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/*.html', ['htmlmin', browserSync.reload]);
  gulp.watch('src/js/**/*.js', ['uglify', browserSync.reload]);
  gulp.watch('src/img/**/*.+(png|jpg|jpeg|gif|svg)', ['imagemin', browserSync.reload]);
});

// Setup Default Task
gulp.task('default', ['watch']);
