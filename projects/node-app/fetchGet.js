const { fetch } = require('@flew/network');
const { guid, subscribe, publish } = require('@flew/core');

/**
 * gernerate universal id
 */
console.log('guid()', guid());

/**
 * events driven subscription
 */
subscribe('searchSmallGifCats', them => console.log(them));

/**
 * simple get request from http driver
 * which publishes results to the earlier subscribed event
 */
fetch('kitty', {
  silent: false, // show logs
  baseURL: 'https://api.thecatapi.com',
  endpoint: '/v1',
})
  .from('http') // use http driver
  .get('/images/search?size=small&mime_types=gif')
  .subscribe(
    cats => publish('searchSmallGifCats', cats),
    err => console.log(err),
  );
