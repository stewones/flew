import * as fs from 'fs';
import * as Table from 'markdown-table';

import { Rebased } from '../../../projects/libs/core/src/symbols/rebased';
import { ParseDriver } from '../../../projects/libs/parse/src';
import {
  FirebaseDriver,
  FirestoreDriver
} from '../../../projects/libs/firebase/src';
import { RebasedCore } from '../../../projects/libs/core/src/fetch/server';

const table = Table.default;

const specMap = {
  true: '✅',
  false: '⛔️'
};

Rebased.driver.firebase = new FirebaseDriver({
  instance: {}
});

Rebased.driver.firestore = new FirestoreDriver({
  instance: {}
});

Rebased.driver.parse = new ParseDriver({
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

const markdownSplit = markdownOrigin.split('## Verb Availability');

for (let counter = 0; counter < markdownSplit.length - 1; counter++) {
  markdownResult.push(markdownSplit[counter]);
}

markdown = markdownResult.join('\n');

markdown += `
## Verb Availability
`;

const matrix = [['']];

for (const driver in Rebased.driver) {
  matrix[0].push(driver);
}

const verbs = Rebased.driver.http.verbs;

for (const verb in verbs) {
  matrix.push([`<a href="/core/api#RebasedCore+${verb}">${verb}</a>`]);
}

let row = 1;
let col = 1;
for (const driver in Rebased.driver) {
  const available = Rebased.driver[driver].verbs;
  for (const verb in available) {
    const spec = JSON.stringify(available[verb]);
    matrix[col].push(
      specMap[spec]
        ? `<span className="block-center">${specMap[spec]}</span>`
        : '<small className="block-center">🛣️ <br />`' +
            JSON.parse(spec) +
            '`</small>'
    );

    col += 1;
  }
  row += 1;
  col = 1;
}

markdown += table(matrix);
markdown += `\n\n\n`;
markdown += `<div className="availability">\n`;

markdown += `
| symbol                                    | meaning                                              | description                               |
| ----------------------------------------- | ---------------------------------------------------- | ---------------------- ------------------ |
| <span className="block-center">✅ </span> | <span className="block-center"> available </span>    | method is available for this driver   |
| <span className="block-center">⛔️ </span> | <span className="block-center"> unavailable </span>  | method is not allowed for this driver | 
| <span className="block-center">🛣️ </span> | <span className="block-center"> routed </span>       | method is routed to another driver    | 
`;

markdown += `\n</div>`;

console.log(markdown);

fs.writeFile(`../../docs/core/verbs.md`, markdown, function(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`verbs doc generated`);
});

// console.log(table(matrix));
