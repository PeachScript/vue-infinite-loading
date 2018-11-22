const importReg = /import (style\d+) from (".+")\n/g;
const injectReg = /\nfunction injectStyles[^]+?\n}/;

function replaceImportWithRequire(source) {
  let result;
  let count = source.match(importReg).length;
  const fragments = [];
  const hasInjection = injectReg.test(source);

  result =  source.replace(importReg, (_match, name, request) => {
    fragments.push([
      `var ${name} = require(${request})\n`,
      `if (${name}.__inject__) ${name}.__inject__(context)\n`
    ].join(''));

    // replace import with require through append way if there has no injection
    return (!hasInjection && !(--count))
      ? `
function injectStyles (context) {
  ${fragments.join('')}
}`
      : '';
  });

  // append require statements into inject function if there already has injection
  if (hasInjection) {
    result = result.replace(injectReg, (func) => {
      return func.replace(/}$/, `${fragments.join('')}}`);
    });
  }

  // replace argument for normalizer function
  result = result.replace(/(normalizer\((?:[^,]+,){4})([^,]+)/, '$1\n  injectStyles');

  return result;
}

module.exports = function(source) {
  let result = source;

  // only enable if there has import statement
  if (importReg.test(source)) {
    result = replaceImportWithRequire(source);
  }

  return result;
};
