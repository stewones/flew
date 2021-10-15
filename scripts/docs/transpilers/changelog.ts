import fs from 'fs';

const readmeContent = fs.readFileSync('../../CHANGELOG.md', {
  encoding: 'utf8'
});
const readmeDocsContent = fs.readFileSync('./content/changelog.hbs', {
  encoding: 'utf8'
});

const gettingStarted = readmeDocsContent
  .split('@@CONTENT@@')
  .join(readmeContent);

// console.log(gettingStarted);

fs.writeFile('../../docs/changelog.md', gettingStarted, function(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});
