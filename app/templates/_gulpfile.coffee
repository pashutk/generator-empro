# Load all required libraries.
gulp       = require 'gulp'
$          = require('gulp-load-plugins')()
stylus     = require 'gulp-stylus'
prefix     = require 'gulp-autoprefixer'
cssmin     = require 'gulp-cssmin'
jade       = require 'gulp-jade'
minifyHTML = require 'gulp-minify-html'
postcss    = require 'gulp-postcss'
coffee     = require 'gulp-coffee'
concat     = require 'gulp-concat'
csso       = require 'gulp-csso'
browserify = require 'browserify'
source     = require 'vinyl-source-stream'

gulp.task 'css', ->
  gulp.src ['src/styles/**/*.styl','!src/styles/**/_*.styl']
    .pipe stylus()
    .pipe concat 'style.css'
    .pipe prefix '> 1%'
    .pipe csso()
    .pipe gulp.dest 'build/css'

gulp.task 'html', ->
  gulp.src 'src/layouts/**/*.jade'
    .pipe jade()
    .pipe minifyHTML()
    .pipe gulp.dest 'build'

gulp.task 'coffee', ->
  browserify
    entries: ['./src/scripts/main.coffee']
    extensions: ['.coffee']
  .bundle()
  .pipe source 'main.js'
  .pipe gulp.dest 'build/js'

gulp.task 'default', ['css','html','coffee'], ->
  gulp.watch 'src/styles/**/*.styl',['css']
  gulp.watch 'src/layouts/**/*.jade',['html']
  gulp.watch 'src/scripts/**/*.coffee',['coffee']
