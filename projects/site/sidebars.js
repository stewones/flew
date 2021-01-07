module.exports = {
  docs: {
    Intro: ['welcome', 'packages', 'changelog', 'get-started'],
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
    Firebase: ['firebase/api'],
    Parse: ['parse/api'],
    Angular: ['angular/api', 'angular/schematics']
  }
};
