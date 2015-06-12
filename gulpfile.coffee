gulp    = require 'gulp'
coffee  = require 'gulp-coffee'
rimraf  = require 'rimraf'
mocha   = require 'gulp-mocha'

gulp.task 'default', ['clean', 'coffee']

gulp.task 'clean', (cb) ->
  rimraf 'lib/*', cb

gulp.task 'coffee', ->
  gulp.src 'src/**/*.coffee'
    .pipe coffee
      bare: true
    .pipe gulp.dest 'lib/'


gulp.task 'test', ['clean', 'coffee'], ->
  gulp.src 'test/**/*_test.{coffee,js}'
    .pipe mocha
      compilers:
        'coffee': 'coffee-script' 
      globals:
        'expect': require('chai').expect   


gulp.task 'watch', ->
  gulp.watch 'src/**/*.coffee', ['coffee']
  gulp.watch ['lib/**', 'test/**'], ['test']
