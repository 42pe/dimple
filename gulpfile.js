const config = require('./config/dimple.config')

const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const svgSprite = require('gulp-svg-sprite')
// const flatten = require('gulp-flatten')
const webpack = require('webpack')
const webpackConfig = require('./config/webpack.config')

/* ************************************************************************************ */

//  ******************
//  Assets tasks
//  ******************
const processAssets = () => {
  return gulp.src([config.assets.entry]).pipe(gulp.dest(config.assets.output))
}

const watchAssets = () => {
  gulp.watch([config.assets.entry], processAssets)
}

/* ************************************************************************************ */

//  ******************
//  SVG tasks
//  ******************
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

//  ******************
//  SASS tasks
//  ******************

const processSass = () => {
  return gulp
    .src(config.sass.entry)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.sass.output))
}

const watchSass = () => {
  gulp.watch([config.sass.entry], processSass)
}

//  ******************
//  JS tasks
//  ******************

function webpackScripts() {
  webpackConfig.mode = 'development'
  return new Promise(resolve =>
    webpack(webpackConfig, (err, stats) => {
      if (err) console.log('Webpack', err)

      console.log(
        stats.toString({
          /* stats options */
        })
      )

      resolve()
    })
  )
}

const processJS = gulp.series(webpackScripts)
const watchJS = () => {
  gulp.watch([config.js.watch], processJS)
}

/* ************************************************************************************ */

// Watch
const watchTask = gulp.parallel(
  watchSass,
  watchJS,
  watchAssets,
  watchSVGs
  // watchTemplates
)
watchTask.description = 'watch for changes to all source'

// Process
const processTask = gulp.parallel(
  processSass,
  processJS,
  processAssets,
  processSVGs
  // processTemplates
)

// default task
const defaultTask = gulp.series(processTask, watchTask)

gulp.task('default', defaultTask)
gulp.task('build', processTask)
gulp.task('watch', watchTask)
