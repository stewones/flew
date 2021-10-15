import fs from 'fs';

let readmeContent = fs.readFileSync('../../README.md', {
  encoding: 'utf8'
});
const readmeDocsContent = fs.readFileSync('./content/welcome.hbs', {
  encoding: 'utf8'
});

readmeContent = readmeContent
  .split('style="text-align:center"')
  .join(`style={{textAlign:'center'}}`);

readmeContent = readmeContent
  .split('style="max-width: 150px"')
  .join(`style={{maxWidth:'150px'}}`);

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
