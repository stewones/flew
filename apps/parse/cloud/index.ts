import { collection, Reative } from '@reative/core';

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
