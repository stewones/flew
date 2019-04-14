import { Options } from '../interfaces/options';
import { isEmpty } from 'lodash';
import { PlatformServer } from '../platforms/server';
import { PlatformBrowser } from '../platforms/browser';
import { merge } from 'rxjs';
declare var module;

export function Collection(options: Options) {
  const isServer = typeof module !== 'undefined' && module.exports;
  const useCache =
    isEmpty(options.useCache) && !isServer && options.useCache !== false
      ? true
      : options.useCache;

  if (options.name) options.collection = options.name;
  delete options.useCache;

  return function(constructor: Function) {
    constructor.prototype.$collection = useCache
      ? new PlatformBrowser(options)
      : new PlatformServer(options);

    // client service instance isnt keeping
    // const beforeHttp = constructor.prototype.beforeHttp;
    // if (typeof beforeHttp === 'function') {
    //   constructor.prototype.$collection.beforeHttp = beforeHttp;
    // constructor.prototype.$collection.beforeHttp(beforeHttp);
    // }
  };
}

// export function Collection(options: Options) {
//   return function<T extends { new (...args: any[]): {} }>(constructor: T) {
//     const isServer = typeof module !== 'undefined' && module.exports;
//     const useCache =
//       isEmpty(options.useCache) && !isServer && options.useCache !== false
//         ? true
//         : options.useCache;

//     if (options.name) options.collection = options.name;
//     delete options.useCache;

//     return class extends constructor {
//       $collection = useCache
//         ? new PlatformBrowser(options)
//         : new PlatformServer(options);
//     };
//   };
// }

// export function Collection(options: Options) {
//   return function<T extends { new (...constructorArgs: any[]) }>(
//     constructorFunction: T
//   ) {
//     const isServer = typeof module !== 'undefined' && module.exports;
//     const useCache =
//       isEmpty(options.useCache) && !isServer && options.useCache !== false
//         ? true
//         : options.useCache;

//     if (options.name) options.collection = options.name;
//     delete options.useCache;

//     //new constructor function
//     let newConstructorFunction: any = function(...args) {
//       let func: any = function() {
//         return new constructorFunction(...args);
//       };
//       func.prototype = constructorFunction.prototype;

//       func.prototype.$collection = useCache
//         ? new PlatformBrowser(options)
//         : new PlatformServer(options);

//       let result: any = new func();

//       return result;
//     };
//     newConstructorFunction.prototype = constructorFunction.prototype;
//     return newConstructorFunction;
//   };
// }
