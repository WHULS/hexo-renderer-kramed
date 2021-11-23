# hexo-renderer-kramed

[![Build Status](https://travis-ci.org/sun11/hexo-renderer-kramed.svg?branch=master)](https://travis-ci.org/sun11/hexo-renderer-kramed)  [![NPM version](https://badge.fury.io/js/hexo-renderer-kramed.svg)](http://badge.fury.io/js/hexo-renderer-kramed)

This plugin uses [kramed] but not [marked] as render engine, it is a fork of [hexo-renderer-marked](https://github.com/hexojs/hexo-renderer-marked). You need to uninstall hexo-renderer-marked to avoid conflicts.

## Why use kramed?

Just for the support of mathjax. I've modified the inline math format, like this example below:

```
`$\sigma$`
```

But this renderer will only wrap your inline tex and display tex with a `<script>` tag, to fully enable mathjax, you need to add some js code in your theme, what I did in my theme [hexo-theme-paperbox](https://github.com/sun11/hexo-theme-paperbox) is:

```html
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    menuSettings: {
      zoom: "None"
    },
    showMathMenu: false,
    jax: ["input/TeX","output/CommonHTML"],
    extensions: ["tex2jax.js"],
    TeX: {
      extensions: ["AMSmath.js","AMSsymbols.js"],
      equationNumbers: {
        autoNumber: "AMS"
      }
    },
    tex2jax: {
      inlineMath: [["\\(", "\\)"]],
      displayMath: [["\\[", "\\]"]]
    }
  });
</script>

<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/mathjax/2.6.1/MathJax.js"></script>
```

## Tips

You can use the following formats for your equations:

```
inlineMath: `$\sigma$`

displayMath: $$\sigma$$
```

If you need to contain `$` in \<code\> tag:

```
` $some code$ `
```

If you need to contain `$$` in your text:

```
\$\$
```

## Installation

``` bash
$ npm uninstall hexo-renderer-marked --save
# $ npm install hexo-renderer-kramed --save
$ npm install https://github.com/WHULS/hexo-renderer-kramed 
```

- Hexo 3: >= 0.2
- Hexo 2: 0.1.x

## Options

### Kramed

You can configure this plugin in `_config.yml`.

``` yaml
kramed:
  gfm: true
  pedantic: false
  sanitize: false
  tables: true
  breaks: true
  smartLists: true
  smartypants: true
```

- **gfm** - Enables [GitHub flavored markdown](https://help.github.com/articles/github-flavored-markdown)
- **pedantic** - Conform to obscure parts of `markdown.pl` as much as possible. Don't fix any of the original markdown bugs or poor behavior.
- **sanitize** - Sanitize the output. Ignore any HTML that has been input.
- **tables** - Enable GFM [tables](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#wiki-tables). This option requires the `gfm` option to be true.
- **breaks** - Enable GFM [line breaks](https://help.github.com/articles/github-flavored-markdown#newlines). This option requires the `gfm` option to be true.
- **smartLists** - Use smarter list behavior than the original markdown.
- **smartypants** - Use "smart" typograhic punctuation for things like quotes and dashes.

[Markdown]: http://daringfireball.net/projects/markdown/
[marked]: https://github.com/chjj/marked
[kramed]: https://github.com/GitbookIO/kramed

### Image URL

`hexo-renderer-kramed` perform better than `hexo-renderer-marked` in formula.

However, the setting of image url prefix is poor. So, with the reference of `hexo-renderer-marked`, I add a configure of image url prefix, which is `marked.prependRoot` in `hexo-renderer-marked`.

example:

`_config.yml`

```yaml
root: /myblog/blog1
image:
	prependRoot: true
```

`markdown.md`

```markdown
<img src="/images/image-1.png" alt="image-1" style="zoom:67%;" />
![image-20211017184546812](/images/image-2.png)
```

parsed html

```HTML
<img src="/myblog/blog1/images/image-1.png" alt="image-1.png" style="zoom:67%;" />
<img src="/myblog/blog1/images/image-2.png" alt="image-2">
```

- `root`: The root directory of your website [hexo.io](https://hexo.io/docs/configuration.html#URL)
- `image.prependRoot`: Enable or disable prepend function