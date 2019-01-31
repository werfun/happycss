
# happycss
这是一款可以自动生成css样式的插件，你只需要在 vue中写入 class="w10", 就会自动生成width: 10px;
默认单位为px,如果你需要使用%，请添加如 class="w10p",则会生成 width: 10%
默认生成路径为 /src/assets/css/happycss.css
默认导出路径为 /src/main.js


a [webpack](http://webpack.github.io/) loader for css

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

[npm-image]: https://img.shields.io/npm/v/px2rem-loader.svg
[npm-url]: https://www.npmjs.com/package/happycss
[downloads-image]: http://img.shields.io/npm/dm/px2rem-loader.svg
[downloads-url]: https://www.npmjs.com/package/happycss

## Install

`npm install happycss` or 
`yarn add happycss`

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
##具体规则如下

<table>
  <tr>
    <td>写法</td><td>生成</td>
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
## 

