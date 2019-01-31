
# happycss

<p>这是一款可以自动生成css样式的插件，你只需要在 vue中写入 class="w10", 就会自动生成width: 10px;</p>
<p>默认单位为px,如果你需要使用%</p>
<p>请添加如 class="w10p",则会生成 width: 10%</p>
<p>默认生成路径为 /src/assets/css/happycss.css (请确保已经存在css目录)</p>
<p>默认导出路径为 /src/main.js (非该目录，请配置 importPath)</p>

<p> This is a plug-in that can automatically generate CSS style. You only need to write class= "w10" in vue, and it will automatically generate width: 10px;</p>

<p>The default unit is px, if you need to use%</p>

<p> If you add class= "w10p", you will generate width: 10%</p>

<p>The default generation path is/src/assets/css/happycss.css (make sure that the CSS directory already exists)</p>

<p> The default export path is / src/main.js. (If not this directory, configure importPath)</p>


a [webpack](http://webpack.github.io/) loader for css


[![Downloads][downloads-image]][downloads-url]

[npm-url]: https://www.npmjs.com/package/happycss
[downloads-image]: http://img.shields.io/npm/dm/px2rem-loader.svg
[downloads-url]: https://www.npmjs.com/package/happycss

## Install

<p>npm install happycss</p>
<p>or</p>
<p>yarn add happycss</p>

## webpack config

const happycss = require('happycss')
```
module.exports = {
  // ...
  plugins: [
    new happycss({
      // cssPath: './src/assets/css/happycss.css'
      // importPath: './src/main.js'
    }),
  ]
}
```
## vue-cli 3.0 vue.config.js

const happycss = require('happycss')
```
module.exports = {
  // ...
  configureWebpack: {
    plugins: [
      new happycss({
        // cssPath: './src/assets/css/happycss.css'
        // importPath: './src/main.js'
      })
    ]
  }
}
```


## The specific rules are as follows
## 具体规则如下

<table>
  <tr>
    <td>use(写法)</td><td>generate(生成)</td>
  </tr>
  <tr>
    <td>class="w10"</td><td>.w10 { width: 10px }</td>
  </tr>
  <tr>
    <td>class="w10p"</td><td>.w10 { width: 10% }</td>
  </tr>
  <tr>
    <td>class="h10"</td><td>.h10 { height: 10px }</td>
  </tr>
  <tr>
    <td>class="mt10"</td><td>.mt { margin-top: 10px }</td>
  </tr>
  <tr>
    <td>class="pt10"</td><td>.pt { padding-top: 10px }</td>
  </tr>
  <tr>
    <td>class="lh10"</td><td>.lh10 { line-height: 10px }</td>
  </tr>
</table>


## Change Log

### 0.1.1

* Increase support for crossing'-',''in class class names
* 增加对class类名中 横行'-' 、 '_'的支持

### 0.1.0

* Support Webpack 4.0
* 支持webpack 4.0

### 0.0.6

* Support Webpack 3.0
* auto create happycss.css file

* 支持 Webpack 3.0
* 自动生成 happycss.css 文件

## License

MIT
