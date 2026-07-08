// Regenerates _data/products/index.json — the list of product files the
// live site fetches. Runs automatically on every Netlify build so newly
// added/removed products (via /admin) are always picked up, with no
// manual step required.
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', '_data', 'products');
const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith('.json') && f !== 'index.json')
  .sort();

fs.writeFileSync(path.join(dir, 'index.json'), JSON.stringify(files, null, 2) + '\n');
console.log(`Wrote _data/products/index.json with ${files.length} product(s).`);
