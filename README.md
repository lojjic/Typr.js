# Typr.ts  

TypeScript class wrapper for [photopea/Typr.js](https://github.com/photopea/Typr.js).

I use this library in one of my own TypeScript projects and have only added class features that I needed. Design goal was to keep the core Typr.js as untouched as possible to make eventual merging easier.

* `Typr.parse(buffer)` is done through the class constructor `new typr.Font(buffer)`
* `Typr.U` functions are members of the class `font.codeToGlyph(code)`

#### node load example
```typescript
import * as fs from "fs";
import * as typr from 'typr.ts';

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