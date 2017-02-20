var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var proxy = require('http-proxy-middleware');
var plumber = require('gulp-plumber');

var rename = require('gulp-rename');
var data = require('gulp-data');
var fs = require('fs');
var htmlmin = require('gulp-htmlmin');
var replace = require('gulp-replace');

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var sourcemaps = require('gulp-sourcemaps');

var imagemin = require('gulp-imagemin');

var wp = require('webpack');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

var buildConfig = {
	environment: 'build',
	baseTemplate: 'build',
	destination: 'build',
	postcss: [
		autoprefixer({ browsers: ['last 2 versions', 'ie >= 9', 'ios_saf >= 8', 'Android >= 4.3', '> 1%'] })
	]
};

var config = buildConfig;

gulp.task('serve', ['templates', 'scss'], () => {
	var apiProxy = proxy(['/source'], {
		target: 'http://fsb.org.uk',
		changeOrigin: true // for vhosted sites
	});
	browserSync.init({
		server: {
			baseDir: './build',
			middleware: [apiProxy]
		}
	});
});

gulp.task('templates', () => {
	return gulp.src(['./src/templates/**/*.html'])
		.pipe(gulp.dest(config.destination));
});

gulp.task('templates-watch', ['templates'], (done) => {
	browserSync.reload();
	done();
});

gulp.task('scss', () => {
	var scssStream = gulp.src('src/scss/*.scss');

	if (config.environment === 'build') {
		scssStream = scssStream.pipe(sourcemaps.init());
	}

	scssStream = scssStream.pipe(sass({
			includePaths: ['node_modules']
	})
	.on('error', sass.logError))
		.pipe(postcss(config.postcss));

	if (config.environment === 'build') {
		scssStream = scssStream.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('build/css'))
			.pipe(browserSync.stream());
	}

	return scssStream;

});

gulp.task('images', () => {
	return gulp.src(['./src/images/*.+(jpg|png)'])
		.pipe(gulp.dest(config.destination + '/images'));
});

gulp.task('fonts', () => {
	return gulp.src(['./src/scss/fonts/*.+(eot|ttf|woff|woff2)'])
		.pipe(gulp.dest('build/css/fonts'))
});

gulp.task('scripts', () => {

	return gulp.src(['./src/scripts/main.js', './src/scripts/jquery.js'])
		.pipe(gulp.dest(config.destination + '/scripts'));
});

gulp.task('scripts-watch', ['scripts'], (done) => {
	browserSync.reload();
	done();
});

gulp.task('watch', ['serve', 'scripts', 'images', 'fonts'], () => {
	gulp.watch('src/templates/**/*.html', ['templates-watch']);
	gulp.watch('src/scss/**/*.scss', ['scss']);
	gulp.watch('src/scripts/**/*.+(js|jsx)', ['scripts-watch']);
});

gulp.task('default', ['watch']);
