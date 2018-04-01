'use strict'

const config    = require('./gulp.config')
const plumber   = require('gulp-plumber')
const gulp 	    = require('gulp')
const connect   = require('gulp-connect')
const postCSS   = require('gulp-postcss')
const preCSS    = require('precss')
const rucksack  = require('rucksack-css')
const cssNext   = require('postcss-cssnext')
const jsHint    = require('gulp-jshint')
const webpack   = require('webpack-stream')
const babel     = require('gulp-babel')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const customProperties  = require("postcss-custom-properties")
const customSelector    = require('postcss-custom-selectors')
const clean             = require('postcss-clean')

const processors = [ preCSS(), cssNext(), rucksack(), customSelector(), clean() ]


function handleError(err) {
	console.log(err.toString())
	this.emit('end')
}

/**
* tasks
*/

// task styles
gulp.task('styles', () => {
	return gulp.src(`${config.cssDevPath}/*.css`)
		.pipe(plumber())
		.pipe(postCSS(processors))
		.on('error', handleError)
		.pipe(gulp.dest(`${config.cssDistPath}`))
		.pipe(connect.reload())
})


// task scripts
gulp.task('scripts', () => {
	return gulp.src(`${config.jsDevPath}/*.js`)
		.pipe(jsHint())
		.pipe(webpack({
			module: {
				loaders: [{
					test: /\.js$/,
					loader: "babel-loader",
					options: {
						presets: ["es2015"]
					},
				}]
			},
			output: {
				filename: `${config.jsDistFileName}.js`
			},
			plugins: [
			    new UglifyJsPlugin()	
			]
		}))
		.on('error', handleError)
		.pipe(gulp.dest(`${config.jsDistPath}`))
		.pipe(connect.reload())
})


// task templates
gulp.task('templates', () => {
	return gulp.src('**/*.html')
		.pipe(connect.reload())
})




/**
*
* gulp task default
*
*/

gulp.task('default', () =>{
	connect.server({
    	livereload: true,
    	root: ['.'],
    	port: config.connectPort,
  		host: config.connectHost
  	})

	gulp.watch(`${config.cssDevPath}/**/*.css`, ['styles'])
	gulp.watch(`${config.jsDevPath}/**/*.js`, ['scripts'])
	gulp.watch('**/*.html', ['templates'])
})