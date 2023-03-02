eleventy-plugin-urlify
================================================================================

An eleventy plugin for URL filters. Yes, there are already some… I know.
This one is a bit different, trust me (or don't--as you like).

Ok, here is the pitch: The basic `| url` filter in eleventy doesn't compile an
actual URL. It compiles an absolute path. The new `htmlBaseUrl` plugin transforms
-- well -- everything without much control.

`urlify` is different: You can use the generic `urlify` tag on every URL. 
Absolute URLs are just passed through. And then you configure in the projects
settings file what output you need. Make all URLs absolute (actually absolute),
make them root-relative with eleventys `pathPrefix` or make the relative to
that prefix -- whatever you want. Aaaand █ ███ ███ █████████ ████ ██ ██████ █
███ ██ ███ ██████ ███ █████████ █████ ████ ████ █ ██████ ████████ ███ █████████
█████ ████ ████ █ ██████ ████████ (I didn't implement that yet).

Well, and what if you want to just have that one URL always be root-relative no
matter what the other URLs are? Give it the `rootRelativePath` filter -- easy.
You could also use the `absoluteURL` or `relativePath`
(relative-to-the-pathPrefix filter but that was pretty long) filter. And as a
goodie, I added the `isAbsoluteURL` and `isRootRelative` filters.

Installation
--------------------------------------------------------------------------------

- Tested with eleventy 2.0.0 but should work with 1.0, too (I guess)
- Oh and I only used it with nunjucks. But it's just function and the default context.

```bash
npm install --save-dev eleventy-plugin-urlify
```

Then open your Eleventy config file (probably .eleventy.js) and use addPlugin:

```js
const urlifyPlugin = require("eleventy-plugin-urlify");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(urlifyPlugin);
};
```

You’re only allowed one `module.exports` in your configuration file, so make sure
you only copy the require and the `addPlugin` lines above!

Options
--------------------------------------------------------------------------------

There are a number of options to customize the tag and how the components are
loaded. To get an overview here are all the settings at once:

```js
const urlifyPlugin = require("eleventy-plugin-urlify");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(urlifyPlugin, {
      // This is the path prefix. The default is eleventies pathPrefix but if
      // you must (don't) you could override it here for this plugin only.
      pathPrefix: "/",

      // This is the base URL to build absolute URLs. It should only be the
      // protocol and domain. No slash--use the pathprefix for that.
      baseURL: "http://example.com",

      // Sets the mode for the urlify filter 
      // Modes:
      // 	- **root-relative** make URLs relative to the site root.
      //	- **prefix-relative** make URLs relative to the pathPrefix
      //  - **absolute** make URLs absolute
      urlifyMode: "root-relative",

      // Here you could rename the filters if something would clash with filters
      // you already have installed (don't like the name urlify? 
      // Change it if you must).
      filterMapping: {
        // <filterName>: <functionName>"
        isAbsoluteURL: "isAbsoluteURL",
        isRootRelative: "isRootRelative",
        rootRelativePath: "rootRelativePath",
        relativePath: "prefixRelativePath",
        absoluteURL: "absoluteURL",
        urlify: "urlify"
      }

    });
};
```

Examples
--------------------------------------------------------------------------------

### The `absoluteURL` filter

### The `rootRelativePath` filter

### The `relativePath`filter

### The `urlify`filter

### The `isAbsolutePath` filter

### The `isRootRelativePath` filter
