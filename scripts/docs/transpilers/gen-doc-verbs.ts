import * as fs from 'fs';
import * as Table from 'markdown-table';

import { Rebased } from '../../../projects/libs/core/src/symbols/rebased';
import { ParseDriver } from '../../../projects/libs/parse/src';
import {
  FirebaseDriver,
  FirestoreDriver
} from '../../../projects/libs/firebase/src';
import { RebasedCore } from '../../../projects/libs/core/src/platforms/server';

const table = Table.default;

const specMap = {
  true: '✅',
  false: '⛔️'
};

Rebased.from.firebase = new FirebaseDriver({
  instance: {}
});

Rebased.from.firestore = new FirestoreDriver({
  instance: {}
});

Rebased.from.parse = new ParseDriver({
  serverURL: 'xxx',
  appID: 'yyy',
  instance: {}
});

// tslint:disable-next-line: no-unused-expression
new RebasedCore({});
let markdown = ``;
const markdownOrigin = fs.readFileSync('../../docs/core/verbs.md', {
  encoding: 'utf8'
});
const markdownResult = [];

const markdownSplit = markdownOrigin.split('## Availability');

for (let counter = 0; counter < markdownSplit.length - 1; counter++) {
  markdownResult.push(markdownSplit[counter]);
}

markdown = markdownResult.join('\n');

markdown += `
## Availability
`;

const matrix = [['']];

for (const driver in Rebased.from) {
  matrix[0].push(driver);
}

const verbs = Rebased.from.http.verbs;

for (const verb in verbs) {
  matrix.push([`<a href="/core/api/">${verb}</a>`]);
}

let row = 1;
let col = 1;
for (const driver in Rebased.from) {
  const available = Rebased.from[driver].verbs;
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

fs.writeFile(`../../docs/core/verbs.md`, markdown, function(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`verbs doc generated`);
});

// console.log(table(matrix));
