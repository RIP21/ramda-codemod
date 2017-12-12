module.exports.parser = "babel";

module.exports = function(file, api, options) {
  const useDouble = options.useDouble || false;
  const noSemi = options.noSemi || false;
  const useRequire = options.useRequire || false;

  const j = api.jscodeshift;
  const isContainsRImport =
    file.source.includes("import R from 'ramda'") ||
    file.source.includes('import R from "ramda"');
  if (isContainsRImport) {
    return undefined;
  } else {
    const identifiers = j(file.source).find(j.Identifier);
    let isRDetected = false;
    identifiers.forEach(path => {
      if (path.value.name === "R") {
        isRDetected = true;
      }
    });
    const quote = useDouble ? '"' : "'";
    const semi = noSemi ? "" : ";";
    const require = `const R = require(${quote}ramda${quote})${semi}`;
    const es6Import = `import R from ${quote}ramda${quote}${semi}`;
    const importString = useRequire ? require : es6Import;
    if (isRDetected) {
      return `${importString}\n${file.source}`;
    }
    return undefined;
  }
};
