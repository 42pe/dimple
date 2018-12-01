const config = require('./config/dimple.config')

const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const svgSprite = require('gulp-svg-sprite')
const webpack = require('webpack')
const webpackConfig = require('./config/webpack.config')
const webserver = require('gulp-webserver')

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

//  ******************
//  HTML tasks
//  ******************
const processHTML = () => {
  return gulp.src([config.html.entry]).pipe(gulp.dest(config.html.output))
}

const watchHTML = () => {
  gulp.watch([config.html.entry], processHTML)
}

//  ******************
//  FAVICON tasks
//  ******************
const processFavicon = () => {
  return gulp.src([config.favicon.entry]).pipe(gulp.dest(config.favicon.output))
}

const watchFavicon = () => {
  gulp.watch([config.favicon.entry], processFavicon)
}

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

//  ******************
//  Dev Server
//  ******************

const serve = () => {
  return gulp.src('build').pipe(
    webserver({
      port: config.server.port,
      livereload: true,
      // host: '0.0.0.0',
      open: true
    })
  )
}

/* ************************************************************************************ */

// Watch
const watchTask = gulp.parallel(
  watchSass,
  watchJS,
  watchAssets,
  watchSVGs,
  watchHTML,
  watchFavicon
)
watchTask.description = 'watch for changes to all source'

// Process
const processTask = gulp.parallel(
  processSass,
  processJS,
  processAssets,
  processSVGs,
  processHTML,
  processFavicon
)

// default task
const defaultTask = gulp.series(processTask, gulp.parallel(watchTask, serve))

gulp.task('default', defaultTask)
gulp.task('build', processTask)
gulp.task('watch', watchTask)
