const gulp = require('gulp')
const browserSync = require('browser-sync')

var config = {
  base:   __dirname + '/',
  html:   __dirname + '/**/*.html',
  css:    __dirname + '/css/**/*.css',
  js:     __dirname + '/js/**/*.js',
  img:    __dirname + '/img/**/*'
}

gulp.task('reload', function() {
  console.log('reload')
  browserSync.reload()
})

gulp.task('serve', function() {
  console.log('serve')
  browserSync({
    server: config.base
  })

  gulp.watch(config.html, ['reload'])
  gulp.watch(config.css, ['reload'])
  gulp.watch(config.js, ['reload'])
  gulp.watch(config.img, ['reload'])
})

gulp.task('default', ['serve'])
