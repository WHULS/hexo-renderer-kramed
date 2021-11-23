'use strict';

var kramed = require('kramed');
var assign = require('object-assign');
var stripIndent = require('strip-indent');
var util = require('hexo-util');

var highlight = util.highlight;
var stripHTML = util.stripHTML;
var kramedRenderer = kramed.Renderer;

function Renderer(hexo) {
  kramedRenderer.apply(this);

  this._headingId = {};
  this._hexo = hexo;
}

require('util').inherits(Renderer, kramedRenderer);

// Add id attribute to headings
Renderer.prototype.heading = function(text, level) {
  var id = anchorId(stripHTML(text));
  var headingId = this._headingId;

  // Add a number after id if repeated
  if (headingId[id]) {
    id += '-' + headingId[id]++;
  } else {
    headingId[id] = 1;
  }
  // add headerlink
  return '<h' + level + ' id="' + id + '"><a href="#' + id + '" class="headerlink" title="' + stripHTML(text) + '"></a>' + text + '</h' + level + '>';
};

// Add table-container div to set overflow-x: auto
Renderer.prototype.table = function(header, body) {
  return '<div class="table-container">\n'
    + '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n'
    + '</div>\n';
};

/**
 * Parse image url
 * if set `image.prependRoot` in _config.yml
 * add `root` for each image block
 */
Renderer.prototype.paragraph = function (txt) {
  if (this._hexo.config.image.prependRoot) {
    const reg = txt.match(/<([a-zA-Z]+) /);
    if (reg && reg[1] === 'img') {
      // console.log(txt);
      const r = txt.match(/src="(.*?)"/);
      // console.log(r);
      let prefix = this._hexo.config.root;
      if (prefix[prefix.length - 1] == '/') prefix = prefix.substring(0, prefix.length - 1);
      txt = txt.replace(r[1], prefix + r[1]);
      // console.log(txt)
    }
  }
  return txt;
}

function anchorId(str) {
  return util.slugize(str.trim());
}

kramed.setOptions({
  langPrefix: '',
  highlight: function(code, lang) {
    return highlight(stripIndent(code), {
      lang: lang,
      gutter: false,
      wrap: false
    });
  }
});

// Change inline math rule
function formatText(text) {
  // Fit kramed's rule: $$ + \1 + $$
  return text.replace(/`\$(.*?)\$`/g, '$$$$$1$$$$');
}

module.exports = function(data, options) {
  return kramed(formatText(data.text), assign({
    renderer: new Renderer(this)
  }, this.config.kramed, options));
};
