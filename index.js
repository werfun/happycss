let autoStyle = require('./base')
const fs = require("fs")
let cssStr = ''

function Happycss(options = {}) {
  this.cssPath  = options.cssPath  || "/src/assets/css/happycss.css"
  this.importPath = options.importPath || "/src/main.js"
}

Happycss.prototype.apply = function (compiler) {
  
  compiler.hooks.emit.tapAsync('happycss', (compilation, callback) => {
    compilation.chunks.forEach(function(chunk){
      for (let module of chunk.modulesIterable) {
        if (module._source) {
          cssStr = autoStyle(module._source._value)       
        }
      }
    })

    let cssPath = process.cwd() + this.cssPath
    let importPath = process.cwd() + this.importPath
    

    // 判断css文件是否存在，无则创建，前提是css目录必须存在

    fs.exists(cssPath, exists => {
      if (!exists) {
        fs.open(cssPath, "w", (err, fd) => {
          let cssContent = fs.readFileSync(cssPath, "utf8")
          if (cssContent !== cssStr) {
            fs.writeFileSync(cssPath, cssStr)
          }
          fs.close(fd)
        })
      } else {
        fs.open(cssPath, "r", (err, fd) => {
          let cssContent = fs.readFileSync(cssPath, "utf8")
          if (cssContent !== cssStr) {
            fs.writeFileSync(cssPath, cssStr)
          }
          fs.close(fd)
        })
      }
    })  
    
    // 导出文件路径

    fs.open(importPath, "r", (err, fd) => {
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
