// Regenerates _data/products-index.json — the list of product files the
// live site fetches. Runs automatically on every Netlify build so newly
// added/removed products (via /admin) are always picked up, with no
// manual step required.
//
// Products live one folder per category (_data/products/<category>/<code>.json)
// so /admin always shows them split by category in the sidebar, with no
// manual "Group by" step. The category itself comes from the folder name,
// not a field inside the file — index.html derives it the same way.
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', '_data', 'products');
const files = fs
  .readdirSync(dir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .flatMap((d) =>
    fs
      .readdirSync(path.join(dir, d.name))
      .filter((f) => f.endsWith('.json'))
      .map((f) => `${d.name}/${f}`)
  )
  .sort();

const outFile = path.join(__dirname, '..', '_data', 'products-index.json');
fs.writeFileSync(outFile, JSON.stringify(files, null, 2) + '\n');
console.log(`Wrote _data/products-index.json with ${files.length} product(s).`);
