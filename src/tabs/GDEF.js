Typr.GDEF = {};
Typr.GDEF.parse = function(data, offset, length, font) {
  var bin = Typr._bin;
  var offset0 = offset;

  // var majorVersion = bin.readUshort(data, offset);  offset += 2;
  // var minorVersion = bin.readUshort(data, offset);  offset += 2;
  offset += 4;

  var glyphClassDefOffset = bin.readUshort(data, offset);

  /* future:
  var attachListOffset = bin.readUshort(data, offset);  offset += 2;
  var ligCaretListOffset = bin.readUshort(data, offset);  offset += 2;
  var markAttachClassDefOffset = bin.readUshort(data, offset);  offset += 2;
  if (minorVersion > 1) {
    var markGlyphSetsDefOffset = bin.readUshort(data, offset);
    offset += 2;
    if (minorVersion > 2) {
      var itemVarStoreOffset = bin.readUint(data, offset);
    }
  }
  */

  return {
    glyphClassDef: glyphClassDefOffset === 0 ? null : Typr._lctf.readClassDef(data, offset0 + glyphClassDefOffset)
  }
}
