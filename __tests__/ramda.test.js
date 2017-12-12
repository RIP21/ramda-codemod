'use strict';

jest.autoMockOff();
const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;
const transform = require('../R-globals-add-explicit-import');

describe('R-add-import', () => {
  const input = `R;`
  defineInlineTest(transform, {}, input, `import R from 'ramda';\n${input}`);
  defineInlineTest(transform, { noSemi : true}, input, `import R from 'ramda'\n${input}`);
  defineInlineTest(transform, { useDouble: true }, input, `import R from "ramda";\n${input}`);
  defineInlineTest(transform, { useRequire: true }, input, `const R = require('ramda');\n${input}`);
  defineInlineTest(transform, { useDouble: true, noSemi: true }, input, `import R from "ramda"\n${input}`);
  defineInlineTest(transform, { useDouble: true, noSemi: true, useRequire: true }, input, `const R = require("ramda")\n${input}`);
});
