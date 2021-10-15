import { fetch } from '@rebased/core';
import { aggregate } from './aggregate';

/**
 *  Imports
 */
declare var Parse;

Parse.Cloud.define('fetchRun', req => {
  return fetch(`Todo`)
    .find()
    .toPromise();
});

Parse.Cloud.define('aggregate', aggregate);
