# blob to buffer
![tests](https://github.com/substrate-system/blob-to-buffer/actions/workflows/nodejs.yml/badge.svg)
[![types](https://img.shields.io/npm/types/@substrate-system/blob-to-buffer?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![install size](https://flat.badgen.net/packagephobia/install/@substrate-system/blob-to-buffer)](https://packagephobia.com/result?p=@substrate-system/blob-to-buffer)
[![dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg?style=flat-square)](package.json)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

#### Convert a Blob to a [Buffer](https://github.com/feross/buffer).

[![Sauce Test Status](https://saucelabs.com/browser-matrix/blob-to-buffer.svg)](https://saucelabs.com/u/blob-to-buffer)

Say you're using the ['buffer'](https://github.com/feross/buffer) module on npm, or
[browserify](http://browserify.org/) and you're working with lots of binary data.

Unfortunately, sometimes the browser or someone else's API gives you a `Blob`. Silly
browser. How do you convert it to a `Buffer`?

Something with a goofy `FileReader` thingy... Time to Google for it yet again... There must be a better way!

***There is! Simply use this module!***

Works in the browser. This module is used by [WebTorrent](http://webtorrent.io)!

### install

```
npm install blob-to-buffer
```

### usage

```js
var toBuffer = require('blob-to-buffer')

// Get a Blob somehow...
var blob = new Blob([ new Uint8Array([1, 2, 3]) ], { type: 'application/octet-binary' })

toBuffer(blob, function (err, buffer) {
  if (err) throw err

  buffer[0] // => 1
  buffer.readUInt8(1) // => 2
})
```

### license

MIT. Copyright (c) [Feross Aboukhadijeh](http://feross.org).
