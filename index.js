let autoStyle = require('./base')
const fs = require("fs")


function Happycss(options = {}) {
  this.cssPath  = options.cssPath  || "/src/assets/css/happycss.css"
  this.importPath = options.importPath || "/src/main.js"
  this.cssStr = ''
}

Happycss.prototype.apply = function (compiler) {
  let _this = this

  if (compiler.hooks) {
    compiler.hooks.emit.tapAsync('Happycss', (compilation, callback) => {
      compilation.chunks.forEach(function(chunk){
        for (let module of chunk.modulesIterable) {
          if (module._source) {
            _this.cssStr = autoStyle(module._source._value)       
          }
        }
      })
      commonFun(callback)
    })
  } else {
    compiler.plugin('emit', function(compilation, callback){
      compilation.chunks.forEach(function(chunk){
        chunk.forEachModule(function(module){
          if (module._source) {
            _this.cssStr = autoStyle(module._source._value)       
          }
        })
      })
      commonFun(callback)
    })
  }
  

  function commonFun (callback) {
    let cssPath = process.cwd() + _this.cssPath
    let importPath = process.cwd() + _this.importPath
    // 判断css文件是否存在，无则创建，前提是css目录必须存在

    fs.exists(cssPath, exists => {
      if (!exists) {
        fs.open(cssPath, "w", (err, fd) => {
          let cssContent = fs.readFileSync(cssPath, "utf8")
          if (cssContent !== _this.cssStr) {
            fs.writeFileSync(cssPath, _this.cssStr)
          }
          fs.close(fd)
        })
      } else {
        fs.open(cssPath, "r", (err, fd) => {
          let cssContent = fs.readFileSync(cssPath, "utf8")
          if (cssContent !== _this.cssStr) {
            fs.writeFileSync(cssPath, _this.cssStr)
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
  }
}

module.exports = Happycss
