/* 加载CSS样式
    参数说明
    paras:
      id -> 标签ID default null
      css -> 样式字符串
      href -> 文件路径
*/
var loadCSS = function (paras) {
  var id = paras && paras.id ? paras.id : undefined;
  var css = paras && paras.css ? paras.css : undefined;
  var href = paras && paras.href ? paras.href : undefined;

  

  if (id && document.getElementById(id)) {
      return;
  }

  var head = document.getElementsByTagName('head')[0];
  if (css) {
      var style = document.createElement('style');
      if (id) { style.id = id; }
      style.type = 'text/css';
      style.dataSet = 'mm';
      try {
          if (style.styleSheet) {
              style.styleSheet.cssText += css;
          } else if (document.getBoxObjectFor) {
              style.innerHTML += css;
          } else {
              style.appendChild(document.createTextNode(css))
          }
      } catch (ex) {
          style.cssText += css;
      }
      head.appendChild(style);
  }
  if (href) {
      if (!$('link[href="' + href + '"]').length) {
          var link = document.createElement('link');
          if (id) { link.id = id; }
          link.rel = 'stylesheet';
          link.type = 'text/css';
          link.href = href;
          head.appendChild(link);
      }
  }
}

function GetStringNumValue(str) {
    return str.match(/[0-9]+/)
}

/* 动态生成样式 */
var CssList = [];
var GenerateCSSRegs = {
    Width: /(w\d+p?)/g,
    Height: /(h\d+p?)/g,
    LineHeight: /(lh\d+)/g,
    Margin: /(m[trbl]?n?\d+)/g,
    Padding: /(p[trbl]?n?\d+)/g
};
var autoGenerateIconStyle = function () {
    var css = '\n';

    $('[class]').each(function () {
        var $e = $(this);
        var cssclass = $e.attr('class');
        
        Array.prototype.contains = function(val)
        {
            for (var i = 0; i < this.length; i++)
            {
            if (this[i] == val)
            {
            return true;
            }
            }
            return false;
        }
        String.prototype.contains = function(val)
        {
            return this.indexOf(val) >= 0;
        }

        // WIDTH
        var result = cssclass.match(GenerateCSSRegs.Width);
        if (result && result.length) {
            $.each(result, function (i, v) {
                let numVal = GetStringNumValue(v)
                if (!CssList.contains(v) && numVal) {    // 自己扩展的方法，同Linq
                    if (v.contains('p')) {
                        css += '.' + v + ' { width: ' + numVal + '%; }\n';    // GetStringNumValue 取出字符串中的数字；p结尾的值，代表百分比
                    } else {
                        css += '.' + v + ' { width: ' + numVal + 'px; }\n';
                    }
                    CssList.push(v);
                }
            })
        }

        // HEIGHT
        var result = cssclass.match(GenerateCSSRegs.Heigth);
        if (result && result.length) {
            $.each(result, function (i, v) {
                let numVal = GetStringNumValue(v)
                if (!CssList.contains(v) && numVal) {    // 自己扩展的方法，同Linq
                    if (v.contains('p')) {
                        css += '.' + v + ' { height: ' + numVal + '%; }\n';    // GetStringNumValue 取出字符串中的数字；p结尾的值，代表百分比
                    } else {
                        css += '.' + v + ' { height: ' + numVal + 'px; }\n';
                    }
                    CssList.push(v);
                }
            });
        }

        // LINEHEIGHT
        // ...

        // MARGIN
        result = cssclass.match(GenerateCSSRegs.Margin);
        if (result && result.length) {
            $.each(result, function (i, v) {
                let numVal = GetStringNumValue(v)
                if (!CssList.contains(v) && numVal) {
                    var direction = v.contains('t') ? '-top' : v.contains('r') ? '-right' : v.contains('b') ? '-bottom' : v.contains('l') ? '-left' : '';
                    css += '.' + v + ' { margin' + direction + ': ' + (v.contains('n') ? '-' : '') + numVal + 'px; }\n';　　// n开头的值，代表负值
                    CssList.push(v);
                }
            });
        }

        // PADDING
        result = cssclass.match(GenerateCSSRegs.Padding);
        if (result && result.length) {
            $.each(result, function (i, v) {
                let numVal = GetStringNumValue(v)
                if (!CssList.contains(v) && numVal) {
                    var direction = v.contains('t') ? '-top' : v.contains('r') ? '-right' : v.contains('b') ? '-bottom' : v.contains('l') ? '-left' : '';
                    css += '.' + v + ' { padding' + direction + ': ' + (v.contains('n') ? '-' : '') + numVal + 'px; }\n';　　// n开头的值，代表负值
                    CssList.push(v);
                }
            })
        }
    })

    loadCSS({ css: css })
};
autoGenerateIconStyle()
