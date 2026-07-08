// Regenerates _data/products-index.json — the list of product files the
// live site fetches. Runs automatically on every Netlify build so newly
// added/removed products (via /admin) are always picked up, with no
// manual step required.
//
// This manifest is written OUTSIDE _data/products/ on purpose: that folder
// is the CMS's folder collection, and Decap CMS treats every matching file
// inside it as a product entry — a manifest file living alongside the
// products would show up as a fake, broken "product" in the editor.
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', '_data', 'products');
const outFile = path.join(__dirname, '..', '_data', 'products-index.json');

const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith('.json'))
  .sort();

fs.writeFileSync(outFile, JSON.stringify(files, null, 2) + '\n');
console.log(`Wrote _data/products-index.json with ${files.length} product(s).`);
