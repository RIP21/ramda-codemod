# ramda-codemod 🛠

It's a simple codemod to add explicit import for `ramda` for files which are using 
it as `R` global variable.

## Why?
`ProvidePlugin` for `Webpack` for globals such as `R` for global `ramda` import doesn't work properly with `babel-plugin-ramda` 
so to fix it you need a lot of manual work. This codemod here to do it automate it for you.

## Input/Output
```javascript
R.map();
```

```javascript
import R from 'ramda';
R.map();
```

## Usage
1. Install jscodeshift`npm i -g jscodeshift`
2. Download `R-globals-add-explicit-import.js` from this repo or download it like 
`npm i ramda-codemod` and take it from `node_modules/ramda-codemod/R-globals-add-explicit-import.js`
3. In root of the project with sources under `/src` for example call
`jscodemode -t <path-to-codemod>/R-globals-add-explicit-import.js ./src --noSemi=true`
4. PROFIT!

## Run Options
* `noSemi` - removes `;` from the import statement :)
* `useDouble` - wraps with `"` instead of `'` so `import R from "ramda";`
* `useRequire` - instead of ES6 imports uses require() function.

## IT DOESN'T WORK!!!
If you use some other global variable which is differentiate from `R` then, I'm sorry, it will not work :)
