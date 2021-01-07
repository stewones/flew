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
      'state/create-store',
      'state/set-state',
      'state/get-state',
      'state/connect',
      'state/reset-state',
      'state/api'
    ],
    Cache: ['cache/api'],
    Firebase: ['firebase/api'],
    Parse: ['parse/api'],
    Angular: ['angular/api', 'angular/schematics']
  }
};
