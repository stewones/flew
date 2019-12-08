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
let markdown = `# Verbs API\n\n`;

const matrix = [['']];

for (const driver in service.verbs) {
  matrix[0].push(driver);
}

const verbs = service.verbs.http;
for (const verb in verbs) {
  matrix.push([`[${verb}](https://docs.reative.dev/core/platform)`]);
}

let row = 1;
let col = 1;
for (const driver in service.verbs) {
  const available = service.verbs[driver];
  for (const verb in available) {
    const spec = JSON.stringify(available[verb]);

    matrix[col].push(
      specMap[spec] ? specMap[spec] : `⚙<sub>${JSON.parse(spec)}</sub>`
    );

    col += 1;
  }
  row += 1;
  col = 1;
}

markdown += table(matrix);
markdown += `\n\n\n`;
markdown += `✅ available ⛔️ unavailable ⚙ routed`;

console.log(markdown);

fs.writeFile(`../docs/core/verbs.md`, markdown, function(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`verbs doc generated`);
});

// console.log(table(matrix));
