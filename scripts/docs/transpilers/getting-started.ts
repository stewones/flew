import fs from 'fs';

const readmeContent = fs.readFileSync('../../README.md', {
  encoding: 'utf8'
});
const readmeDocsContent = fs.readFileSync('./content/getting-started.hbs', {
  encoding: 'utf8'
});

const gettingStarted = readmeDocsContent
  .split('@@README_CONTENT@@')
  .join(readmeContent);

// console.log(gettingStarted);

fs.writeFile('../../docs/getting-started.md', gettingStarted, function(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});
