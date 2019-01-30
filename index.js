let autoStyle = require('./base')
const fs = require("fs")
let cssStr = ''

function Happycss(options = {}) {
  this.options = options
  this.cssPath  = options.cssPath  || "/src/assets/css/happycss.css"
  this.importPath = options.importPath || "/src/main.js"
}

Happycss.prototype.apply = function (compiler) {
  let _this = this
  compiler.plugin('emit', function(compilation, callback){
    compilation.chunks.forEach(function(chunk){
        chunk.forEachModule(function(module){
          if (module._source) {
            cssStr = autoStyle(module._source._value)       
          }
        })
        chunk.files.forEach(function(filename){
          let source = compilation.assets[filename].source()
          // console.log('file', source)
        })
    })

    let cssPath = process.cwd() + _this.cssPath
    let importPath = process.cwd() + _this.importPath
    fs.open(cssPath, "r+", (err, fd) => {
      console.log(fd)
      let cssContent = fs.readFileSync(cssPath, "utf8")
      if (cssContent !== cssStr) {
        fs.writeFileSync(cssPath, cssStr)
      }
      
      fs.close(fd)
    })

    fs.open(importPath, "r", (err, fd) => {
      console.log(fd)
      let importContent = `import '${cssPath}'`
      let mainContent = fs.readFileSync(importPath, "utf8")
      if (mainContent.indexOf(importContent) === -1) {
        fs.appendFileSync(importPath, importContent)
      }
      fs.close(fd)
    })
    callback()
  })
}
module.exports = Happycss
