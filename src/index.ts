/**
 *
 * TypeScript class wrapper for Typr.js library
 * Most types are only declared for code completion as the backing library has no idea what it actually parses or creates
 *
 * **/

import { Typr as TyprJS } from "./Typr.js";

export interface Path {
	cmds: string[],
	crds: number[],
}
interface headTable {
	tableVersion: number,
	fontRevision: number,
	checkSumAdjustment: number,
	magicNumber: number,
	flags: number,
	unitsPerEm: number,
	created: number,
	modified: number,
	xMin: number,
	yMin: number,
	xMax: number,
	yMax: number,
	macStyle: number,
	lowestRecPPEM: number,
	fontDirectionHint: number,
	indexToLocFormat: number,
	glyphDataFormat: number,
}
interface hheaTable {
	ascender: number,
	descender: number,
	lineGap: number,
	advanceWidthMax: number,
	minLeftSideBearing: number,
	minRightSideBearing: number,
	xMaxExtent: number,
	caretSlopeRise: number,
	caretSlopeRun: number,
	caretOffset: number,
	metricDataFormat: number,
	numberOfHMetrics: number,
}
interface hmtxTable {
	aWidth: number[],
	lsBearing: number[],
}
interface kernTable {
	glyph1: number[],
	rval: { glyph2: number[], vals: number[] }[]
}
interface nameTable {
	copyright: string | undefined,
	fontFamily: string | undefined,
	fontSubfamily: string | undefined,
	ID: string | undefined,
	fullName: string | undefined,
	version: string | undefined,
	postScriptName: string | undefined,
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
	darkPalett: string | undefined,
}
interface cmapTable { [key: string]: any }  // not typed yet

interface scriptListEntry { [lang: string]: { features: number[], reqFeature: number } }
interface featureListEntry { tab: number[], tag: string, featureParams?: number }
interface lookupListEntry { flag: number, ltype: number, tabs: any[] }
interface lctf {
	scriptList: { [script: string]: scriptListEntry }
	featureList: featureListEntry[],
	lookupList: lookupListEntry[],
}
interface GSUBTable extends lctf { }
interface GPOSTable extends lctf { }

const friendlyTags = { "aalt": "Access All Alternates", "abvf": "Above-base Forms", "abvm": "Above - base Mark Positioning", "abvs": "Above - base Substitutions", "afrc": "Alternative Fractions", "akhn": "Akhands", "blwf": "Below - base Forms", "blwm": "Below - base Mark Positioning", "blws": "Below - base Substitutions", "calt": "Contextual Alternates", "case": "Case - Sensitive Forms", "ccmp": "Glyph Composition / Decomposition", "cfar": "Conjunct Form After Ro", "cjct": "Conjunct Forms", "clig": "Contextual Ligatures", "cpct": "Centered CJK Punctuation", "cpsp": "Capital Spacing", "cswh": "Contextual Swash", "curs": "Cursive Positioning", "c2pc": "Petite Capitals From Capitals", "c2sc": "Small Capitals From Capitals", "dist": "Distances", "dlig": "Discretionary Ligatures", "dnom": "Denominators", "dtls": "Dotless Forms", "expt": "Expert Forms", "falt": "Final Glyph on Line Alternates", "fin2": "Terminal Forms #2", "fin3": "Terminal Forms #3", "fina": "Terminal Forms", "flac": "Flattened accent forms", "frac": "Fractions", "fwid": "Full Widths", "half": "Half Forms", "haln": "Halant Forms", "halt": "Alternate Half Widths", "hist": "Historical Forms", "hkna": "Horizontal Kana Alternates", "hlig": "Historical Ligatures", "hngl": "Hangul", "hojo": "Hojo Kanji Forms(JIS X 0212 - 1990 Kanji Forms)", "hwid": "Half Widths", "init": "Initial Forms", "isol": "Isolated Forms", "ital": "Italics", "jalt": "Justification Alternates", "jp78": "JIS78 Forms", "jp83": "JIS83 Forms", "jp90": "JIS90 Forms", "jp04": "JIS2004 Forms", "kern": "Kerning", "lfbd": "Left Bounds", "liga": "Standard Ligatures", "ljmo": "Leading Jamo Forms", "lnum": "Lining Figures", "locl": "Localized Forms", "ltra": "Left - to - right alternates", "ltrm": "Left - to - right mirrored forms", "mark": "Mark Positioning", "med2": "Medial Forms #2", "medi": "Medial Forms", "mgrk": "Mathematical Greek", "mkmk": "Mark to Mark Positioning", "mset": "Mark Positioning via Substitution", "nalt": "Alternate Annotation Forms", "nlck": "NLC Kanji Forms", "nukt": "Nukta Forms", "numr": "Numerators", "onum": "Oldstyle Figures", "opbd": "Optical Bounds", "ordn": "Ordinals", "ornm": "Ornaments", "palt": "Proportional Alternate Widths", "pcap": "Petite Capitals", "pkna": "Proportional Kana", "pnum": "Proportional Figures", "pref": "Pre - Base Forms", "pres": "Pre - base Substitutions", "pstf": "Post - base Forms", "psts": "Post - base Substitutions", "pwid": "Proportional Widths", "qwid": "Quarter Widths", "rand": "Randomize", "rclt": "Required Contextual Alternates", "rkrf": "Rakar Forms", "rlig": "Required Ligatures", "rphf": "Reph Forms", "rtbd": "Right Bounds", "rtla": "Right - to - left alternates", "rtlm": "Right - to - left mirrored forms", "ruby": "Ruby Notation Forms", "rvrn": "Required Variation Alternates", "salt": "Stylistic Alternates", "sinf": "Scientific Inferiors", "size": "Optical size", "smcp": "Small Capitals", "smpl": "Simplified Forms", "ssty": "Math script style alternates", "stch": "Stretching Glyph Decomposition", "subs": "Subscript", "sups": "Superscript", "swsh": "Swash", "titl": "Titling", "tjmo": "Trailing Jamo Forms", "tnam": "Traditional Name Forms", "tnum": "Tabular Figures", "trad": "Traditional Forms", "twid": "Third Widths", "unic": "Unicase", "valt": "Alternate Vertical Metrics", "vatu": "Vattu Variants", "vert": "Vertical Writing", "vhal": "Alternate Vertical Half Metrics", "vjmo": "Vowel Jamo Forms", "vkna": "Vertical Kana Alternates", "vkrn": "Vertical Kerning", "vpal": "Proportional Alternate Vertical Metrics", "vrt2": "Vertical Alternates and Rotation", "vrtr": "Vertical Alternates for Rotation", "zero": "Slashed Zero" };

export class Font {
	public _data: any;
	public cmap?: cmapTable;
	public head?: headTable;
	public hhea?: hheaTable;
	public hmtx?: hmtxTable;
	public name?: nameTable;
	public kern?: kernTable;
	public GSUB?: GSUBTable;
	public GPOS?: GPOSTable;

	public constructor(data: ArrayBuffer) {
		const obj = TyprJS.parse(data);
		// Only support for one font (obj[0])
		if (!obj.length || typeof obj[0] !== "object" || typeof obj[0].hasOwnProperty !== "function") {
			throw "unable to parse font";
		}
		for (let n in obj[0]) {
			this[n] = obj[0][n];
		}
		this.enabledGSUB = {};
	}
	public getFamilyName(): string {
		return this.name && (this.name.typoFamilyName || this.name.fontFamily) || "";
	}
	public getSubFamilyName(): string {
		return this.name && (this.name.typoSubfamilyName || this.name.fontSubfamily) || "";
	}
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
	public pathToSVG(path: Path, prec?: Number): string {
		return TyprJS.U.pathToSVG(path, prec);
	}
	public pathToContext(path: Path, ctx: CanvasRenderingContext2D): void {
		return TyprJS.U.pathToContext(path, ctx);
	}

	/*** Additional features ***/

	public lookupFriendlyName(table: string, feature: number): string {
		if (this[table] !== undefined) {
			const tbl = this[table] as lctf;
			const feat = tbl.featureList[feature];
			return this.featureFriendlyName(feat);
		}
		return "";
	}

	public featureFriendlyName(feature: featureListEntry): string {
		if (friendlyTags[feature.tag]) {
			return friendlyTags[feature.tag];
		}
		if (feature.tag.match(/ss[0-2][0-9]/)) {
			let name = "Stylistic Set " + Number(feature.tag.substr(2, 2)).toString();
			if (feature.featureParams) {
				let version = TyprJS._bin.readUshort(this._data, feature.featureParams);
				if (version === 0) {
					let nameID = TyprJS._bin.readUshort(this._data, feature.featureParams + 2);
					if (this.name && this.name[nameID] !== undefined) {
						return name + " - " + this.name[nameID];
					}
				}
			}
			return name;
		}
		if (feature.tag.match(/cv[0-9][0-9]/)) {
			return "Character Variant " + Number(feature.tag.substr(2, 2)).toString();
		}
		return "";
	}

	protected enabledGSUB: { [key: number]: number };
	public enableGSUB(featureNumber: number) {
		if (this.GSUB) {
			const feature = this.GSUB.featureList[featureNumber];
			if (feature) {
				for (let i = 0; i < feature.tab.length; ++i) {
					this.enabledGSUB[feature.tab[i]] = (this.enabledGSUB[feature.tab[i]] || 0) + 1;
				}
			}
		}
	}
	public disableGSUB(featureNumber: number) {
		if (this.GSUB) {
			const feature = this.GSUB.featureList[featureNumber];
			if (feature) {
				for (let i = 0; i < feature.tab.length; ++i) {
					if (this.enabledGSUB[feature.tab[i]] > 1) {
						--this.enabledGSUB[feature.tab[i]];
					} else {
						delete this.enabledGSUB[feature.tab[i]];
					}
				}
			}
		}
	}
	public codeToGlyph(code: number): number {
		let g = TyprJS.U.codeToGlyph(this, code);
		if (this.GSUB) {
			let gls = [g];
			for (const n in this.enabledGSUB) {
				const l = this.GSUB.lookupList[n];
				TyprJS.U._applySubs(gls, 0, l, this.GSUB.lookupList);
			}
			if (gls.length === 1) return gls[0];
		}
		return g;
	};
}