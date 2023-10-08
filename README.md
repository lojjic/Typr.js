# @lojjic/typr

> NOTE: This is a temporary branch forked from [fredli74/Typr.js](https://github.com/fredli74/Typr.ts) for the sole purpose of NPM-publishing accumulated fixes/changes that have not yet been merged back into fredli74's repo, for use in [troika-three-text](https://github.com/protectwise/troika/tree/main/packages/troika-three-text). Don't rely on it - `@fredli74/typr` is the canonical version.

TypeScript class wrapper for [photopea/Typr.js](https://github.com/photopea/Typr.js).

Design goal was to keep the core Typr.js fork in a separate [branch](https://github.com/fredli74/Typr.ts/tree/Typr.js) as close to the original as possible to make eventual merging easier.

As of May 2020, the official photopea Typr.js project switched to using HarfBuzz and threw a lot of the font format parsing out. For that reason, my fork will have to continue it's own path.

I use this library in one of my own TypeScript projects and have only added class features that I needed.

* `Typr.parse(buffer)` is done through the class constructor `new typr.Font(buffer)`
* `Typr.U` functions are members of the class `font.codeToGlyph(code)`

#### Installation

```sh
npm install @fredli74/typr --save-dev
```

#### node load example
```typescript
import * as fs from "fs";
import * as typr from '@fredli74/typr';

function toArrayBuffer(buf: Buffer) {
	let ab = new ArrayBuffer(buf.length);
	let view = new Uint8Array(ab);
	for (let i = 0; i < buf.length; ++i) {
		view[i] = buf[i];
	}
	return ab;
}
const data = fs.readFileSync("filename.ttf");
const font = new typr.Font(toArrayBuffer(data));
```
