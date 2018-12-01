const config = require('./config/dimple.config')

const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
// const flatten = require('gulp-flatten')
// const webpack = require('webpack')
// const webpackConfig = require('./webpack.config.js')
// const svgSprite = require('gulp-svg-sprite')

// ASSETS copy
const processAssets = () => {
  return gulp.src([config.assets.entry]).pipe(gulp.dest(config.assets.output))
}

const watchAssets = () => {
  gulp.watch([config.assets.entry], processAssets)
}

// Watch
const watchTask = gulp.parallel(
  // watchSass,
  // watchJS,
  watchAssets
  // watchSVGs,
  // watchTemplates
)
watchTask.description = 'watch for changes to all source'

// Process
const processTask = gulp.parallel(
  // processSass,
  // processJS,
  processAssets
  // processSVGs,
  // processTemplates
)

// default task
const defaultTask = gulp.series(processTask, watchTask)

gulp.task('default', defaultTask)
gulp.task('build', processTask)
gulp.task('watch', watchTask)
