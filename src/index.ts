/**
 *
 * TypeScript class wrapper for Typr.js library
 * Most types are only declared for code completion as the backing library has no idea what it actually parses or creates
 *
 * **/

import { Typr as TyprJS } from "./Typr.js";

export interface Path {
	cmds: string[];
	crds: number[];
}
interface headTable {
	tableVersion: number;
	fontRevision: number;
	checkSumAdjustment: number;
	magicNumber: number;
	flags: number;
	unitsPerEm: number;
	created: number;
	modified: number;
	xMin: number;
	yMin: number;
	xMax: number;
	yMax: number;
	macStyle: number;
	lowestRecPPEM: number;
	fontDirectionHint: number;
	indexToLocFormat: number;
	glyphDataFormat: number;
};
interface hheaTable {
	ascender: number;
	descender: number;
	lineGap: number;
	advanceWidthMax: number;
	minLeftSideBearing: number;
	minRightSideBearing: number;
	xMaxExtent: number;
	caretSlopeRise: number;
	caretSlopeRun: number;
	caretOffset: number;
	metricDataFormat: number;
	numberOfHMetrics: number;
};
interface hmtxTable {
	aWidth: number[];
	lsBearing: number[];
};
interface kernTable {
	glyph1: number[],
	rval: { glyph2: number[], vals: number[] }[]
};
interface nameTable {
	copyright: string | undefined;
	fontFamily: string | undefined;
	fontSubfamily: string | undefined;
	ID: string | undefined;
	fullName: string | undefined;
	version: string | undefined;
	postScriptName: string | undefined;
	trademark: string | undefined,
	manufacturer: string | undefined,
	designer: string | undefined,
	description: string | undefined,
	urlVendor: string | undefined,
	urlDesigner: string | undefined,
	licence: string | undefined,
	licenceURL: string | undefined,
	typoFamilyName: string | undefined,
	typoSubfamilyName: string | undefined,
	compatibleFull: string | undefined,
	sampleText: string | undefined,
	postScriptCID: string | undefined,
	wwsFamilyName: string | undefined,
	wwsSubfamilyName: string | undefined,
	lightPalette: string | undefined,
	darkPalett: string | undefined
};
interface cmapTable {  // not typed yet
	[key: string]: any
};
interface lctf {
	scriptList: { [key: string]: any };
	featureList: any[];
	lookupList: any[];
}
interface GSUBTable extends lctf {
	//	[key: string]: any
};

export class Font {
	public _data: any;
	public cmap: cmapTable;
	public head: headTable;
	public hhea: hheaTable;
	public hmtx: hmtxTable;
	public name: nameTable | undefined;
	public kern: kernTable | undefined;
	public GSUB: GSUBTable | undefined;

	public constructor(data: ArrayBuffer) {
		const obj = TyprJS.parse(data);
		// Only support for one font (obj[0])
		if (!obj.length || typeof obj[0] !== "object" || typeof obj[0].hasOwnProperty !== "function") {
			throw "unable to parse font";
		}
		for (let n in obj[0]) {
			this[n] = obj[0][n];
		}
	}
	public getFamilyName(): string {
		return this.name && (this.name.typoFamilyName || this.name.fontFamily) || "";
	}
	public getSubFamilyName(): string {
		return this.name && (this.name.typoSubfamilyName || this.name.fontSubfamily) || "";
	}
	public codeToGlyph(code: number): number {
		return TyprJS.U.codeToGlyph(this, code);
	};
	public glyphToPath(gid: number): Path {
		return TyprJS.U.glyphToPath(this, gid);
	}
	public getPairAdjustment(gid1: number, gid2: number): number {
		return TyprJS.U.getPairAdjustment(this, gid1, gid2);
	}
	public stringToGlyphs(str: string): number[] {
		return TyprJS.U.stringToGlyphs(this, str);
	}
	public glyphsToPath(gls: number[]): Path {
		return TyprJS.U.glyphsToPath(this, gls);
	}
	public pathToSVG(path: Path): string {
		return TyprJS.U.pathToSVG(this, path);
	}
	public pathToContext(path: Path, ctx: CanvasRenderingContext2D): void {
		return TyprJS.U.pathToContext(this, path, ctx);
	}
}