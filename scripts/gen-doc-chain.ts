import { Records } from '@reative/core';
import * as fs from 'fs';
import * as Table from 'markdown-table';
const table = Table.default;

const specMap = {
  true: '✅',
  false: '⛔️'
};

class RecordsExtended extends Records {
  public verbs;
  public chaining;

  constructor(options) {
    super(options);
  }
}

const service = new RecordsExtended({});
let markdown = `# Chaining API\n\n`;

const matrix = [['']];

for (const driver in service.chaining) {
  matrix[0].push(driver);
}

const actions = service.chaining.http;
for (const action in actions) {
  matrix.push([`[${action}](https://docs.reative.dev/core/chain/${action})`]);
}

let row = 1;
let col = 1;
for (const driver in service.chaining) {
  const available = service.chaining[driver];
  for (const verb in available) {
    const spec = JSON.stringify(available[verb]);

    matrix[col].push(specMap[spec] ? specMap[spec] : `⚙`);

    col += 1;
  }
  row += 1;
  col = 1;
}

markdown += table(matrix);
markdown += `\n\n\n`;
markdown += `> ✅ available ⛔️ unavailable ⚙ only in browser`;

console.log(markdown);

fs.writeFile(`../docs/core/chain/README.md`, markdown, function(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`chaining doc generated`);
});

// console.log(table(matrix));
