import fs from 'fs';

const readmeContent = fs.readFileSync('../../README.md', {
  encoding: 'utf8'
});
const readmeDocsContent = fs.readFileSync('./content/welcome.hbs', {
  encoding: 'utf8'
});

const gettingStarted = readmeDocsContent
  .split('@@CONTENT@@')
  .join(readmeContent);

// console.log(gettingStarted);

fs.writeFile('../../docs/welcome.md', gettingStarted, function(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});
