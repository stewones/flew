module.exports = {
  docs: {
    Intro: ['welcome', 'get-started', 'changelog'],
    Core: [
      'core/setup',
      'core/options',
      'core/fetch',
      'core/chain',
      'core/verbs',
      'core/api'
    ],

    State: [
      'state/setup',
      'state/connect',
      'state/getState',
      'state/setState',
      'state/unsetState',
      'state/resetState',
      'state/createStore',
      'state/api'
    ],
    Cache: ['cache/setup', 'cache/api'],
    Firebase: ['firebase/setup', 'firebase/api'],
    Parse: ['parse/setup', 'parse/api'],
    Angular: ['angular/api', 'angular/schematics']
  }
};
