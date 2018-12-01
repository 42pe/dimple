const srcFolder = './src'
const buildFolder = './build'

module.exports = {
  buildFolder: buildFolder,
  assets: {
    entry: `${srcFolder}/assets/**/*`, // files
    output: `${buildFolder}/assets`
  },
  html: {
    entry: `${srcFolder}/html/**/*`, // files
    output: `${buildFolder}`
  },
  favicon: {
    entry: `${srcFolder}/favicon/*`, // files
    output: `${buildFolder}`
  },
  svgs: {
    entry: `${srcFolder}/svgs/*.svg`, // files
    output: `${buildFolder}/assets`
  },
  sass: {
    entry: `${srcFolder}/scss/main.scss`, // file
    output: `${buildFolder}` // folder
  },
  js: {
    entry: `../${srcFolder}/js/main.js`, // file
    watch: `${srcFolder}/js/**/*`, // files
    output: './all.min.js' // filename
  },
  server: {
    port: 8000
  }
}
