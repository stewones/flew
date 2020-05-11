export const environment = {
  production: true,
  dbStoreName: 'parse-demo',
  dbName: 'prod',
  parse: {
    appID: 'AppServer',
    masterKey: 'AppParse', // from client used only for tests
    serverURL: 'http://localhost:1337/api'
  }
};
