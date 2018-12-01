const config = require('./config/dimple.config')

const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
// const flatten = require('gulp-flatten')
// const webpack = require('webpack')
// const webpackConfig = require('./webpack.config.js')
const svgSprite = require('gulp-svg-sprite')

// Assets tasks
const processAssets = () => {
  return gulp.src([config.assets.entry]).pipe(gulp.dest(config.assets.output))
}

const watchAssets = () => {
  gulp.watch([config.assets.entry], processAssets)
}

// SVGs Tasks
const processSVGs = () => {
  return gulp
    .src([config.svgs.entry])
    .pipe(
      svgSprite({
        mode: {
          stack: true
        },
        svg: {
          // General options for created SVG files
          xmlDeclaration: false, // Add XML declaration to SVG sprite
          doctypeDeclaration: false
        }
      })
    ) // Activate Sass output (with default options) // Activate the «symbol» mode
    .pipe(gulp.dest(config.svgs.output))
}

const watchSVGs = () => {
  gulp.watch([config.svgs.entry], processSVGs)
}

// Watch
const watchTask = gulp.parallel(
  // watchSass,
  // watchJS,
  watchAssets,
  watchSVGs
  // watchTemplates
)
watchTask.description = 'watch for changes to all source'

// Process
const processTask = gulp.parallel(
  // processSass,
  // processJS,
  processAssets,
  processSVGs
  // processTemplates
)

// default task
const defaultTask = gulp.series(processTask, watchTask)

gulp.task('default', defaultTask)
gulp.task('build', processTask)
gulp.task('watch', watchTask)
