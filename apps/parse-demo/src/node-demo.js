const Core = require('@reative/core');
const ReativeParse = require('@reative/parse');
const Parse = require('parse/node');

ReativeParse.install(Parse, {
  appID: 'OnTimeServer',
  serverURL: 'http://localhost:1337/api',
  masterKey: 'OnTimeParse'
});

const debriefService = Core.collection(`Debrief`, { driver: 'parse' });

debriefService
  .findOne()
  .toPromise()
  .then(console.log)
  .catch(console.log);
