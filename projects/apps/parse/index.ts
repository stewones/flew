/**
 *  Imports
 */
declare var Parse;
import bodyParser from 'body-parser';
import path from 'path';
import express from 'express';
import { ParseServer } from 'parse-server';

/**
 * Configure Rebased
 */
import { install } from '@rebased/parse';
import { Rebased } from '@rebased/core';

/**
 * Set default driver
 */
Rebased.options.from = `parse`;

/**
 * Configure parse instance
 */
install(Parse, {
  appID: process.env.APP_ID || 'AppServer',
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/api',
  masterKey: process.env.MASTER_KEY || 'AppParse'
});

/**
 * Configure API
 */
const databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;
if (!databaseUri)
  console.log('DATABASE_URI not specified, falling back to localhost.');

const api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/app-dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud',
  appId: process.env.APP_ID || 'AppServer',
  masterKey: process.env.MASTER_KEY || 'AppParse', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/api', // Don't forget to change to https if needed
  liveQuery: {
    classNames: ['_User', 'Todo'] // List of classes to support for query subscriptions
  },
  logsFolder: databaseUri ? '/tmp' : './logs',
  appName: 'Rebased App',
  publicServerURL: process.env.SERVER_URL || 'http://0.0.0.0:1337/api'
});

/**
 *  Init express
 */
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
const mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send(`Rebased App`);
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
// app.get('/test', function(req, res) {
//   res.sendFile(path.join(__dirname, '/public/test.html'));
// });

const port = process.env.PORT || 1337;
const httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
  console.log('Rebased App Server running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
