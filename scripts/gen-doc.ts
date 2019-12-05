import { Records } from '@reative/core';
import * as fs from 'fs';
import * as Table from 'markdown-table';
import extract from 'extract-comments';
import jsdoc2md from 'jsdoc-to-markdown';
import dox from 'dox';
const dmd = require('dmd');
const jsdoc = require('jsdoc-api');
const decomment = require('decomment');
// console.log(jsdocApi);

const table = Table.default;

const docMap = [
  {
    from: '../libs/cache/src/cache.ts',
    to: '../docs/cache/cache.md'
  }
];

docMap.map(doc => {
  const parsing = /\/\*\*\s*\n([^\*]|(\*(?!\/)))*\*\//g;
  const fileText = fs.readFileSync(doc.from, 'utf8');
  const rawComments = extract(fileText);
  const docComments = [];
  // rawComments.map(rawComment => {
  //   console.log(rawComment.raw);
  //   // docComments.push(jsdoc.explainSync({ source: rawComment.raw }));
  // });
  // console.log(rawComments[0]);
  const result = dox.parseComments(fileText);
  console.log(result);
  // result.map(it=>{
  //   console.log(dmd(it));
  // })
  //  console.log(jsdoc.explainSync({ source: parsing.exec(fileText)[0] }));
});

// fs.writeFile(`../docs/core/verbs/README.md`, markdown, function(err) {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }
//   console.log(`verbs doc generated`);
// });

// console.log(table(matrix));
