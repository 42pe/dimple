const srcFolder = './src'
const buildFolder = './build'

module.exports = {
  buildFolder: buildFolder,
  js: {
    entry: `${srcFolder}/js/main.js`, // file
    output: './all.min.js' // filename
  },
  assets: {
    entry: `${srcFolder}/assets/**/*`, // files
    output: `${buildFolder}/assets`
  },
  svgs: {
    entry: `${srcFolder}/svgs/*.svg`, // files
    output: `${buildFolder}/assets`
  },
  sass: {
    entry: `${srcFolder}/scss/main.scss`, // file
    output: `${buildFolder}` // folder
  }
}
