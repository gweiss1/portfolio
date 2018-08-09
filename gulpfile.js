var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

// File paths
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var SCSS_PATH = 'public/scss/**/*.scss';
var DIST_PATH = 'public/dist';

// Styles
// gulp.task('styles', function() {
// 	console.log('Starting styles task');
// 	return gulp.src(['public/css/reset.css', CSS_PATH])
// 		.pipe(plumber(function(err) {
// 			console.log('Styles Task Error');
// 			console.log(err);
// 			this.emit('end');
// 		}))
// 		.pipe(sourcemaps.init())
// 		.pipe(autoprefixer())
// 		.pipe(concat('styles.css'))
// 		.pipe(minifyCss())
// 		.pipe(sourcemaps.write())
// 		.pipe(gulp.dest(DIST_PATH))
// 		.pipe(livereload());
// });

// SCSS Styles 
gulp.task('styles', function() {
	console.log('Starting styles task');
	return gulp.src('public/scss/styles.scss')
		.pipe(plumber(function(err) {
			console.log('Styles Task Error');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

// Scripts
gulp.task('scripts', function() {
	console.log('Starting scripts task');

	return gulp.src(SCRIPTS_PATH)
		.pipe(plumber(function(err) {
			console.log('Scripts Task Error');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('scripts.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

// Images
gulp.task('images', function() {
	console.log('Starting images task');
});

// Default
gulp.task('default', function() {
	console.log('Starting default task');
});

// Watch
gulp.task('watch', function() {
	console.log('Starting watch task');
	require('./server.js');
	livereload.listen();
	gulp.watch(SCRIPTS_PATH, ['scripts']);
	// gulp.watch(CSS_PATH, ['styles']);
	gulp.watch(SCSS_PATH, ['styles']);
});