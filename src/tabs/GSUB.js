

Typr.GSUB = {};
Typr.GSUB.parse = function(data, offset, length, font) {  return Typr._lctf.parse(data, offset, length, font, Typr.GSUB.subt);  }


Typr.GSUB.subt = function(data, ltype, offset, ltable)	// lookup type
{
	var bin = Typr._bin, offset0 = offset, tab = {};

	tab.fmt  = bin.readUshort(data, offset);  offset+=2;

	if(ltype!=1 && ltype!=2 && ltype!=4 && ltype!=5 && ltype!=6) return null;

	if(ltype==1 || ltype==2 || ltype==4 || (ltype==5 && tab.fmt<=2) || (ltype==6 && tab.fmt<=2)) {
		var covOff  = bin.readUshort(data, offset);  offset+=2;
		tab.coverage = Typr._lctf.readCoverage(data, offset0+covOff);	// not always is coverage here
	}

	//  Single Substitution Subtable
	if(ltype==1 && tab.fmt>=1 && tab.fmt<=2) {
		if(tab.fmt==1) {
			tab.delta = bin.readShort(data, offset);  offset+=2;
		}
		else if(tab.fmt==2) {
			var cnt = bin.readUshort(data, offset);  offset+=2;
			tab.newg = bin.readUshorts(data, offset, cnt);  offset+=tab.newg.length*2;
		}
	}
	//  Multiple Substitution Subtable (decomposition)
	else if(ltype==2 && tab.fmt==1) {
		var cnt = bin.readUshort(data, offset);  offset+=2;
		tab.seqs = [];
		for (var i=0; i<cnt; i++) {
			var seqOff = bin.readUshort(data, offset) + offset0;  offset+=2;
			var seqSize = bin.readUshort(data, seqOff);
			tab.seqs.push(bin.readUshorts(data, seqOff + 2, seqSize));
		}
	}
	//  Ligature Substitution Subtable
	else if(ltype==4) {
		tab.vals = [];
		var cnt = bin.readUshort(data, offset);  offset+=2;
		for(var i=0; i<cnt; i++) {
			var loff = bin.readUshort(data, offset);  offset+=2;
			tab.vals.push(Typr.GSUB.readLigatureSet(data, offset0+loff));
		}
		//console.warn(tab.coverage);
		//console.warn(tab.vals);
	}
	//  Contextual Substitution Subtable
	else if(ltype==5 && tab.fmt==2) {
		if(tab.fmt==2) {
			var cDefOffset = bin.readUshort(data, offset);  offset+=2;
			tab.cDef = Typr._lctf.readClassDef(data, offset0 + cDefOffset);
			tab.scset = [];
			var subClassSetCount = bin.readUshort(data, offset);  offset+=2;
			for(var i=0; i<subClassSetCount; i++)
			{
				var scsOff = bin.readUshort(data, offset);  offset+=2;
				tab.scset.push(  scsOff==0 ? null : Typr.GSUB.readSubClassSet(data, offset0 + scsOff)  );
			}
		}
		//else console.warn("unknown table format", tab.fmt);
	}
	//*
	else if(ltype==6 && tab.fmt==3) {
		/*
		if(tab.fmt==2) {
			var btDef = bin.readUshort(data, offset);  offset+=2;
			var inDef = bin.readUshort(data, offset);  offset+=2;
			var laDef = bin.readUshort(data, offset);  offset+=2;

			tab.btDef = Typr._lctf.readClassDef(data, offset0 + btDef);
			tab.inDef = Typr._lctf.readClassDef(data, offset0 + inDef);
			tab.laDef = Typr._lctf.readClassDef(data, offset0 + laDef);

			tab.scset = [];
			var cnt = bin.readUshort(data, offset);  offset+=2;
			for(var i=0; i<cnt; i++) {
				var loff = bin.readUshort(data, offset);  offset+=2;
				tab.scset.push(Typr.GSUB.readChainSubClassSet(data, offset0+loff));
			}
		}
		*/
		if(tab.fmt==3) {
			for(var i=0; i<3; i++) {
				var cnt = bin.readUshort(data, offset);  offset+=2;
				var cvgs = [];
				for(var j=0; j<cnt; j++) cvgs.push(  Typr._lctf.readCoverage(data, offset0 + bin.readUshort(data, offset+j*2))   );
				offset+=cnt*2;
				if(i==0) tab.backCvg = cvgs;
				if(i==1) tab.inptCvg = cvgs;
				if(i==2) tab.ahedCvg = cvgs;
			}
			var cnt = bin.readUshort(data, offset);  offset+=2;
			tab.lookupRec = Typr.GSUB.readSubstLookupRecords(data, offset, cnt);
		}
		//console.warn(tab);
	} //*/
	else if(ltype==7 && tab.fmt==1) {
		var extType = bin.readUshort(data, offset);  offset+=2;
		var extOffset = bin.readUint(data, offset);  offset+=4;
		if (ltable.ltype==9) {
			ltable.ltype = extType;
		} else if (ltable.ltype!=extType) {
			throw "invalid extension substitution"; // all subtables must be the same type
		}
		return Typr.GSUB.subt(data, ltable.ltype, offset0+extOffset);
	}
	else console.warn("unsupported GSUB table LookupType", ltype, "format", tab.fmt);
	//if(tab.coverage.indexOf(3)!=-1) console.warn(ltype, fmt, tab);

	return tab;
}

Typr.GSUB.readSubClassSet = function(data, offset)
{
	var rUs = Typr._bin.readUshort, offset0 = offset, lset = [];
	var cnt = rUs(data, offset);  offset+=2;
	for(var i=0; i<cnt; i++) {
		var loff = rUs(data, offset);  offset+=2;
		lset.push(Typr.GSUB.readSubClassRule(data, offset0+loff));
	}
	return lset;
}
Typr.GSUB.readSubClassRule= function(data, offset)
{
	var rUs = Typr._bin.readUshort, offset0 = offset, rule = {};
	var gcount = rUs(data, offset);  offset+=2;
	var scount = rUs(data, offset);  offset+=2;
	rule.input = [];
	for(var i=0; i<gcount-1; i++) {
		rule.input.push(rUs(data, offset));  offset+=2;
	}
	rule.substLookupRecords = Typr.GSUB.readSubstLookupRecords(data, offset, scount);
	return rule;
}
Typr.GSUB.readSubstLookupRecords = function(data, offset, cnt)
{
	var rUs = Typr._bin.readUshort;
	var out = [];
	for(var i=0; i<cnt; i++) {  out.push(rUs(data, offset), rUs(data, offset+2));  offset+=4;  }
	return out;
}

Typr.GSUB.readChainSubClassSet = function(data, offset)
{
	var bin = Typr._bin, offset0 = offset, lset = [];
	var cnt = bin.readUshort(data, offset);  offset+=2;
	for(var i=0; i<cnt; i++) {
		var loff = bin.readUshort(data, offset);  offset+=2;
		lset.push(Typr.GSUB.readChainSubClassRule(data, offset0+loff));
	}
	return lset;
}
Typr.GSUB.readChainSubClassRule= function(data, offset)
{
	var bin = Typr._bin, offset0 = offset, rule = {};
	var pps = ["backtrack", "input", "lookahead"];
	for(var pi=0; pi<pps.length; pi++) {
		var cnt = bin.readUshort(data, offset);  offset+=2;  if(pi==1) cnt--;
		rule[pps[pi]]=bin.readUshorts(data, offset, cnt);  offset+= rule[pps[pi]].length*2;
	}
	var cnt = bin.readUshort(data, offset);  offset+=2;
	rule.subst = bin.readUshorts(data, offset, cnt*2);  offset += rule.subst.length*2;
	return rule;
}

Typr.GSUB.readLigatureSet = function(data, offset)
{
	var bin = Typr._bin, offset0 = offset, lset = [];
	var lcnt = bin.readUshort(data, offset);  offset+=2;
	for(var j=0; j<lcnt; j++) {
		var loff = bin.readUshort(data, offset);  offset+=2;
		lset.push(Typr.GSUB.readLigature(data, offset0+loff));
	}
	return lset;
}
Typr.GSUB.readLigature = function(data, offset)
{
	var bin = Typr._bin, lig = {chain:[]};
	lig.nglyph = bin.readUshort(data, offset);  offset+=2;
	var ccnt = bin.readUshort(data, offset);  offset+=2;
	for(var k=0; k<ccnt-1; k++) {  lig.chain.push(bin.readUshort(data, offset));  offset+=2;  }
	return lig;
}

