import { collection, Reative } from '@reative/core';
import { aggregate } from './aggregate';

/**
 *  Imports
 */
declare var Parse;

Parse.Cloud.define('collectionRun', req => {
  return collection(`Todo`)
    .driver(`parse`)
    .find()
    .toPromise();
});

Parse.Cloud.define('aggregate', aggregate);
