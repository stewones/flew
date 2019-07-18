import { PlatformBrowser } from './browser';
import { StorageAdapter } from '../interfaces/storage';
import { Reactive } from '../symbols/rr';
import { Subject, PartialObserver } from 'rxjs';
import { Logger } from '../utils/logger';
import { Response } from '../interfaces/response';
import { ReactiveVerb } from '../interfaces/verb';
import { Chain } from '../interfaces/chain';

class PlatformBrowserMock extends PlatformBrowser {
  _storage: StorageAdapter;

  constructor(options) {
    super(options);
  }

  public ttl$(evaluation, observer, chain, key) {
    return super.ttl$(evaluation, observer, chain, key);
  }

  public shouldCallNetwork(chain: Chain = {}, key: string) {
    return super.shouldCallNetwork(chain, key);
  }

  public shouldReturnCache(
    chain: Chain,
    key: string,
    observer: PartialObserver<any>
  ) {
    return super.shouldReturnCache(chain, key, observer);
  }

  public setCache(
    verb: ReactiveVerb,
    chain: Chain,
    key: string,
    network: Response & { ttl?: number },
    observer
  ) {
    return super.setCache(verb, chain, key, network, observer);
  }

  public dispatch(observer = { next: data => {} }, data, chain) {
    return super.dispatch(observer, data, chain);
  }
}

describe('Browser Platform', () => {
  let lib: PlatformBrowser;
  const baseURL = 'http://firetask.dev';
  const collection = 'foo-collection';

  beforeEach(() => {
    lib = new PlatformBrowser({
      useLog: false,
      baseURL: baseURL,
      collection: collection,
      connector: {},
      storage: { clear: () => {} } as StorageAdapter
    });
  });

  it('should be created using minimal setup', () => {
    const lib_ = new PlatformBrowser({});
    expect(lib_).toBeTruthy();
  });

  it('should fail if `useCache` true and no storage instance is available', () => {
    expect(() => {
      lib = new PlatformBrowser({
        useLog: false,
        baseURL: baseURL,
        collection: collection,
        connector: {},
        chain: {
          useCache: true
        }
      });
    }).toThrowError('missing storage instance');
  });

  it('should implement `clearCache`', () => {
    const spy = jest.spyOn(PlatformBrowser.prototype, 'clearCache');
    lib.clearCache();
    expect(spy).toHaveBeenCalled();
  });

  it('should NOT `feed` responses from cache into rr store', () => {
    Reactive.options.storage = null;

    const lib_ = new PlatformBrowser({
      useLog: false,
      baseURL: baseURL,
      collection: collection
    });

    const spy = jest.spyOn(Reactive.store.sync, 'next');

    lib_.feed();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should `feed` responses from cache into rr store', () => {
    Reactive.options.storage = {
      forEach: (cb: any) => {
        const result = [
          { data: { a: 1 }, collection: collection, key: 'a1' },
          { data: { b: 2 }, collection: collection, key: 'b2' },
          { data: { c: 3 }, collection: 'foo', key: 'c3' }
        ];
        result.forEach((item, index) => {
          cb(item, item.key, index);
        });
      }
    } as StorageAdapter;

    const spy = jest.spyOn(Reactive.store.sync, 'next');

    lib.feed();

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      collection: 'foo-collection',
      data: { a: 1 },
      key: 'a1'
    });
    expect(spy).toHaveBeenCalledWith({
      collection: 'foo-collection',
      data: { b: 2 },
      key: 'b2'
    });
    expect(spy).not.toHaveBeenCalledWith({
      collection: 'foo',
      data: { c: 3 },
      key: 'c3'
    });
  });

  it('should implement [get] verb', () => {
    let lib_ = new PlatformBrowser({
      useLog: false,
      baseURL: baseURL,
      endpoint: '/',
      collection: collection,
      connector: {
        http: { get: () => Promise.resolve([1, 2, 3]) }
      },
      storage: {
        get: () => Promise.resolve({}),
        set: () => Promise.resolve({})
      } as any
    });
    const spy = jest.spyOn(PlatformBrowser.prototype, 'get');
    lib_
      .get()
      .toPromise()
      .then(r =>
        expect(r).toEqual({
          collection: 'foo-collection',
          data: [1, 2, 3],
          driver: 'http',
          key:
            'foo-collection://ce7f8c3d4d180e4d01e7e074af47f093f79e38b793b69f344f4d4b8be455397a',
          response: [1, 2, 3]
        })
      );
    lib_.get('').toPromise();
    expect(spy).toHaveBeenCalledTimes(2);
  });

  // it('should implement [post] verb', () => {
  //   let lib_ = new PlatformBrowser({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {
  //       http: { post: () => Promise.resolve([1, 2, 3]) }
  //     },
  //     storage: {
  //       get: () => Promise.resolve({}),
  //       set: () => Promise.resolve({})
  //     } as any
  //   });
  //   const spy = jest.spyOn(PlatformBrowser.prototype, 'post');
  //   lib_
  //     .post()
  //     .toPromise()
  //     .then(r =>
  //       expect(r).toEqual({
  //         collection: 'foo-collection',
  //         data: [1, 2, 3],
  //         driver: 'http',
  //         key:
  //           'foo-collection://9bec985c576e8467c4b1986bda0e6e09fc421796c2e97c7ecb5112784ef4137f',
  //         response: [1, 2, 3]
  //       })
  //     );
  //   lib_.post('', { a: 1, b: 2, c: 3 }).toPromise();
  //   expect(spy).toHaveBeenCalledTimes(2);
  // });

  // it('should implement [patch] verb', () => {
  //   let lib_ = new PlatformBrowser({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {
  //       http: { patch: () => Promise.resolve([1, 2, 3]) }
  //     },
  //     storage: {
  //       get: () => Promise.resolve({}),
  //       set: () => Promise.resolve({})
  //     } as any
  //   });
  //   const spy = jest.spyOn(PlatformBrowser.prototype, 'patch');
  //   lib_
  //     .patch()
  //     .toPromise()
  //     .then(r =>
  //       expect(r).toEqual({
  //         collection: 'foo-collection',
  //         data: [1, 2, 3],
  //         driver: 'http',
  //         key:
  //           'foo-collection://824cb3473e9415ed8136c7e97d9cb0027542fe1b78ea587cf9c1de22c666be03',
  //         response: [1, 2, 3]
  //       })
  //     );
  //   lib_.patch('', { a: 1, b: 2, c: 3 }).toPromise();
  //   expect(spy).toHaveBeenCalledTimes(2);
  // });

  // it('should implement [find] verb', () => {
  //   let lib_ = new PlatformBrowser({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {
  //       firestore: {
  //         where: () => {},
  //         collection: () => {
  //           return {
  //             get: () =>
  //               Promise.resolve([
  //                 {
  //                   data: () => {
  //                     return { a: 1, b: 2, c: 3 };
  //                   }
  //                 }
  //               ]),
  //             where: () => {
  //               return {
  //                 where: () => {
  //                   return {
  //                     get: () =>
  //                       Promise.resolve([
  //                         {
  //                           data: () => {
  //                             return { a: 1, b: 2, c: 3 };
  //                           }
  //                         }
  //                       ])
  //                   };
  //                 }
  //               };
  //             }
  //           };
  //         }
  //       }
  //     },
  //     storage: {
  //       get: () => Promise.resolve({}),
  //       set: () => Promise.resolve({})
  //     } as any
  //   });
  //   const spy = jest.spyOn(PlatformBrowser.prototype, 'find');
  //   lib_
  //     .find()
  //     .toPromise()
  //     .then(r =>
  //       expect(r).toEqual({
  //         collection: 'foo-collection',
  //         data: [{ a: 1, b: 2, c: 3 }],
  //         driver: 'firestore',
  //         key:
  //           'foo-collection://dd4bc65734b5835fbe48cec541fa70bea687d5b9874e08d9b0922b9aa1d792bb',
  //         response: { empty: undefined, meta: undefined, size: undefined }
  //       })
  //     );
  //   lib_.find().toPromise();
  //   expect(spy).toHaveBeenCalledTimes(2);
  // });

  // it('should implement [findOne] verb', () => {
  //   let lib_ = new PlatformBrowser({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {
  //       firestore: {
  //         where: () => {},
  //         collection: () => {
  //           return {
  //             get: () =>
  //               Promise.resolve([
  //                 {
  //                   data: () => {
  //                     return { a: 1, b: 2, c: 3 };
  //                   }
  //                 }
  //               ]),
  //             where: () => {
  //               return {
  //                 where: () => {
  //                   return {
  //                     get: () =>
  //                       Promise.resolve([
  //                         {
  //                           data: () => {
  //                             return { a: 1, b: 2, c: 3 };
  //                           }
  //                         }
  //                       ])
  //                   };
  //                 }
  //               };
  //             }
  //           };
  //         }
  //       }
  //     },
  //     storage: {
  //       get: () => Promise.resolve({}),
  //       set: () => Promise.resolve({})
  //     } as any
  //   });
  //   const spy = jest.spyOn(PlatformBrowser.prototype, 'findOne');
  //   lib_
  //     .findOne()
  //     .toPromise()
  //     .then(r =>
  //       expect(r).toEqual({
  //         collection: 'foo-collection',
  //         data: { a: 1, b: 2, c: 3 },
  //         driver: 'firestore',
  //         key:
  //           'foo-collection://2aff32a65583745d3ef90a7e6e1102ff4027bbc0f3a605e97018ce6a01d6623a',
  //         response: { empty: undefined, meta: undefined, size: undefined }
  //       })
  //     );
  //   lib_.findOne().toPromise();
  //   expect(spy).toHaveBeenCalledTimes(2);
  // });

  // it('should transform response', () => {
  //   let lib_ = new PlatformBrowser({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {
  //       firestore: {
  //         where: () => {},
  //         collection: () => {
  //           return {
  //             get: () =>
  //               Promise.resolve([
  //                 {
  //                   data: () => {
  //                     return { a: 1, b: 2, c: 3 };
  //                   }
  //                 }
  //               ]),
  //             where: () => {
  //               return {
  //                 where: () => {
  //                   return {
  //                     get: () =>
  //                       Promise.resolve([
  //                         {
  //                           data: () => {
  //                             return { a: 1, b: 2, c: 3 };
  //                           }
  //                         }
  //                       ])
  //                   };
  //                 }
  //               };
  //             }
  //           };
  //         }
  //       }
  //     },
  //     storage: {
  //       get: () => Promise.resolve({}),
  //       set: () => Promise.resolve({})
  //     } as any
  //   });

  //   lib_
  //     .transformResponse(r => r.data)
  //     .findOne()
  //     .toPromise()
  //     .then(r => expect(r).toEqual({ a: 1, b: 2, c: 3 }));
  // });

  // it('should transform data', () => {
  //   let lib_ = new PlatformBrowser({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {
  //       firestore: {
  //         where: () => {},
  //         collection: () => {
  //           return {
  //             get: () =>
  //               Promise.resolve([
  //                 {
  //                   data: () => {
  //                     return { a: 1, b: 2, c: 3 };
  //                   }
  //                 }
  //               ]),
  //             where: () => {
  //               return {
  //                 where: () => {
  //                   return {
  //                     get: () =>
  //                       Promise.resolve([
  //                         {
  //                           data: () => {
  //                             return { a: 1, b: 2, c: 3 };
  //                           }
  //                         }
  //                       ])
  //                   };
  //                 }
  //               };
  //             }
  //           };
  //         }
  //       }
  //     },
  //     storage: {
  //       get: () => Promise.resolve({}),
  //       set: () => Promise.resolve({})
  //     }
  //   } as any);

  //   lib_
  //     .data(true)
  //     .findOne()
  //     .toPromise()
  //     .then(r => expect(r).toEqual({ a: 1, b: 2, c: 3 }));
  // });

  // it('should transform data from elasticsearch', () => {
  //   let lib_ = new PlatformBrowser({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {
  //       http: {
  //         post: () =>
  //           Promise.resolve({
  //             data: {
  //               hits: {
  //                 hits: [
  //                   {
  //                     _source: { a: 1, b: 2, c: 3 }
  //                   },
  //                   {
  //                     _source: { a: 4, b: 5, c: 6 }
  //                   },
  //                   {
  //                     _source: { a: 7, b: 8, c: 9 }
  //                   }
  //                 ]
  //               }
  //             }
  //           })
  //       }
  //     },
  //     storage: {
  //       get: () => Promise.resolve({}),
  //       set: () => Promise.resolve({})
  //     } as any
  //   });

  //   lib_
  //     .data(true)
  //     .post()
  //     .toPromise()
  //     .then(r =>
  //       expect(r).toEqual([
  //         { a: 1, b: 2, c: 3 },
  //         { a: 4, b: 5, c: 6 },
  //         { a: 7, b: 8, c: 9 }
  //       ])
  //     );
  // });

  // it('should fail on network request', () => {
  //   let lib_ = new PlatformBrowser({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {
  //       http: {
  //         post: () =>
  //           Promise.reject({
  //             message: 'network error'
  //           })
  //       }
  //     },
  //     storage: {
  //       get: () => Promise.resolve({}),
  //       set: () => Promise.resolve({})
  //     } as any
  //   });

  //   lib_
  //     .data(true)
  //     .post()
  //     .toPromise()
  //     .catch(err => expect(err).toEqual({ message: 'network error' }));
  // });

  // it('should return response from cache when using ttl', () => {
  //   let lib_ = new PlatformBrowserMock({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {
  //       http: {
  //         post: () =>
  //           Promise.reject({
  //             message: 'network error'
  //           })
  //       }
  //     },
  //     storage: {
  //       get: () => Promise.resolve({}),
  //       set: () => Promise.resolve({})
  //     } as any
  //   });

  //   lib_.init({
  //     logger: new Logger({
  //       subject: new Subject(),
  //       useLog: false,
  //       useLogTrace: false
  //     })
  //   } as any);

  //   const observer = { next: () => {}, complete: () => {} };
  //   const spyNext = jest.spyOn(observer, 'next');
  //   const spyComplete = jest.spyOn(observer, 'complete');

  //   lib_
  //     .ttl$(
  //       {
  //         now: false,
  //         cache: { collection: 'foo-collection', data: { a: 1 }, key: 'a1' }
  //       },
  //       observer,
  //       {},
  //       'the-key'
  //     )
  //     .toPromise();
  //   expect(spyNext).toHaveBeenCalledWith({
  //     collection: 'foo-collection',
  //     data: { a: 1 },
  //     key: 'a1'
  //   });
  //   expect(spyComplete).toHaveBeenCalled();
  // });

  // it('should call network', () => {
  //   let lib_ = new PlatformBrowserMock({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {
  //       http: {
  //         post: () =>
  //           Promise.reject({
  //             message: 'network error'
  //           })
  //       }
  //     },
  //     storage: {
  //       get: () => Promise.resolve(),
  //       set: () => Promise.resolve({})
  //     } as any
  //   });

  //   lib_
  //     .shouldCallNetwork(
  //       {
  //         useCache: false
  //       },
  //       'the-key'
  //     )
  //     .then(r => expect(r).toEqual({ now: true }));

  //   lib_
  //     .shouldCallNetwork(
  //       {
  //         useNetwork: false
  //       },
  //       'the-key'
  //     )
  //     .then(r => expect(r).toEqual({ now: true }));
  // });

  // it('should NOT return cache', () => {
  //   let lib_ = new PlatformBrowserMock({
  //       useLog: false,
  //       baseURL: baseURL,
  //       endpoint: '/',
  //       collection: collection,
  //       connector: {},
  //       storage: {
  //         get: () => Promise.resolve({}),
  //         set: () => Promise.resolve({})
  //       } as any
  //     }),
  //     observer,
  //     spy;

  //   lib_.init({
  //     logger: new Logger({
  //       subject: new Subject(),
  //       useLog: false,
  //       useLogTrace: false
  //     })
  //   } as any);

  //   observer = { next: () => {}, complete: () => {} };
  //   spy = jest.spyOn(observer, 'next');

  //   lib_
  //     .shouldReturnCache(
  //       {
  //         useCache: false
  //       },
  //       'the-key',
  //       observer
  //     )
  //     .then(_ => {
  //       expect(spy).not.toHaveBeenCalled();
  //     });

  //   lib_
  //     .shouldReturnCache(
  //       {
  //         useCache: true
  //       },
  //       'the-key',
  //       observer
  //     )
  //     .then(_ => {
  //       expect(spy).not.toHaveBeenCalled();
  //     });

  //   lib_
  //     .shouldReturnCache(
  //       {
  //         useCache: true
  //       },
  //       'the-key',
  //       observer
  //     )
  //     .then(_ => {
  //       expect(spy).not.toHaveBeenCalled();
  //     });

  //   lib_
  //     .shouldReturnCache(
  //       {
  //         useCache: true,
  //         transformResponse: r => r.data
  //       },
  //       'the-key',
  //       observer
  //     )
  //     .then(_ => {
  //       expect(spy).not.toHaveBeenCalled();
  //     });
  // });

  // it('should return cache', () => {
  //   let lib_ = new PlatformBrowserMock({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {},
  //     storage: {
  //       get: () =>
  //         Promise.resolve({
  //           collection: 'foo-collection',
  //           data: { a: 1 },
  //           key: 'a1',
  //           ttl: 155726892352525
  //         }),
  //       set: () => Promise.resolve({})
  //     } as any
  //   });

  //   lib_.init({
  //     logger: new Logger({
  //       subject: new Subject(),
  //       useLog: false,
  //       useLogTrace: false
  //     })
  //   } as any);

  //   const observer = {
  //     next: () => {},
  //     complete: () => {}
  //   };

  //   const spyNext = jest.spyOn(observer, 'next');

  //   lib_
  //     .shouldReturnCache(
  //       {
  //         useCache: true
  //       },
  //       'a1',
  //       observer
  //     )
  //     .then(r => {
  //       expect(spyNext).toHaveBeenCalledWith({
  //         collection: 'foo-collection',
  //         data: { a: 1 },
  //         key: 'a1',
  //         ttl: 155726892352525
  //       });
  //     });

  //   lib_ = new PlatformBrowserMock({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {},
  //     storage: {
  //       get: () =>
  //         Promise.resolve([
  //           {
  //             collection: 'foo-collection',
  //             data: { a: 1 },
  //             key: 'a1',
  //             ttl: 155726892352525
  //           }
  //         ]),
  //       set: () => Promise.resolve({})
  //     } as any
  //   });

  //   lib_.init({
  //     logger: new Logger({
  //       subject: new Subject(),
  //       useLog: false,
  //       useLogTrace: false
  //     })
  //   } as any);

  //   const observer2 = {
  //     next: () => {},
  //     complete: () => {}
  //   };

  //   const spyNext2 = jest.spyOn(observer2, 'next');

  //   lib_
  //     .shouldReturnCache(
  //       {
  //         useCache: true
  //       },
  //       'a1',
  //       observer2
  //     )
  //     .then(r => {
  //       expect(spyNext2).toHaveBeenCalledWith([
  //         {
  //           collection: 'foo-collection',
  //           data: { a: 1 },
  //           key: 'a1',
  //           ttl: 155726892352525
  //         }
  //       ]);
  //     });
  // });

  // it('should NOT set cache when saveNetwork is false', () => {
  //   let lib_ = new PlatformBrowserMock({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {},
  //     storage: {
  //       get: () => Promise.resolve({}),
  //       set: () => Promise.resolve('saved')
  //     } as any
  //   });

  //   lib_.init({
  //     logger: new Logger({
  //       subject: new Subject(),
  //       useLog: false,
  //       useLogTrace: false
  //     })
  //   } as any);

  //   const observer = {
  //     next: () => {},
  //     complete: () => {}
  //   };

  //   lib_.setCache(
  //     'find',
  //     { saveNetwork: false },
  //     'a1',
  //     {} as Response,
  //     observer
  //   );
  //   // @todo fix this
  //   // .then(r => {
  //   //   // expect(r).not.toEqual('saved');
  //   // });
  // });

  // it('should NOT set cache if response is the same as the current cache', () => {
  //   let lib_ = new PlatformBrowserMock({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {},
  //     storage: {
  //       get: () => Promise.resolve({ a: 1, b: 2, c: 3 }),
  //       set: () => Promise.resolve('saved')
  //     } as any
  //   });

  //   lib_.init({
  //     logger: new Logger({
  //       subject: new Subject(),
  //       useLog: false,
  //       useLogTrace: false
  //     })
  //   } as any);

  //   const observer = {
  //     next: () => {},
  //     complete: () => {}
  //   };

  //   lib_.setCache(
  //     'find',
  //     { saveNetwork: true },
  //     'a1',
  //     { a: 1, b: 2, c: 3 } as Response,
  //     observer
  //   );
  //   // .then(r => {
  //   //   expect(r).not.toEqual('saved');
  //   // });
  // });

  // it('should set cache', () => {
  //   let lib_ = new PlatformBrowserMock({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {},
  //     storage: {
  //       get: () => Promise.resolve({ a: 1, b: 2, c: 3 }),
  //       set: () => Promise.resolve('saved')
  //     } as any
  //   });

  //   lib_.init({
  //     logger: new Logger({
  //       subject: new Subject(),
  //       useLog: false,
  //       useLogTrace: false
  //     })
  //   } as any);

  //   const observer = {
  //     next: () => {},
  //     complete: () => {}
  //   };

  //   lib_.setCache(
  //     'find',
  //     { saveNetwork: true },
  //     'a1',
  //     { a: 1 } as Response,
  //     observer
  //   );
  //   // .then(r => {
  //   //   expect(r).toEqual('saved');
  //   // });

  //   lib_.setCache(
  //     'find',
  //     { saveNetwork: true, ttl: 60 },
  //     'a1',
  //     { a: 1 } as Response,
  //     observer
  //   );
  //   // .then(r => {
  //   //   expect(r).toEqual('saved');
  //   // });
  // });

  // it('should return network response from `setCache`', async () => {
  //   let lib__ = new PlatformBrowserMock({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {},
  //     storage: {
  //       get: () => Promise.resolve({ data: [1, 2, 3] }),
  //       set: () => Promise.resolve('saved')
  //     } as any
  //   });

  //   lib__.init({
  //     logger: new Logger({
  //       subject: new Subject(),
  //       useLog: false,
  //       useLogTrace: false
  //     })
  //   } as any);

  //   const observer = {
  //     next: () => {},
  //     complete: () => {}
  //   };

  //   const spyNext = jest.spyOn(observer, 'next');
  //   const spyDispatch = jest.spyOn(Reactive.store.sync, 'next');

  //   await lib__.setCache(
  //     'find',
  //     { useNetwork: true },
  //     'a11',
  //     { data: [1, 2, 3, 4] } as Response,
  //     observer
  //   );

  //   expect(spyNext).toHaveBeenCalledWith({ data: [1, 2, 3, 4] });
  //   expect(spyDispatch).toHaveBeenCalledWith({ data: [1, 2, 3, 4] });
  // });

  // it('should transform cache before it saves', async () => {
  //   let lib__ = new PlatformBrowserMock({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {},
  //     storage: {
  //       get: () => Promise.resolve({ data: [1, 2, 3] }),
  //       set: (key, value) => Promise.resolve(value)
  //     } as any
  //   });

  //   lib__.init({
  //     logger: new Logger({
  //       subject: new Subject(),
  //       useLog: false,
  //       useLogTrace: false
  //     })
  //   } as any);

  //   const observer = {
  //     next: () => {},
  //     complete: () => {}
  //   };

  //   const spyNext = jest.spyOn(observer, 'next');
  //   const spyDispatch = jest.spyOn(Reactive.store.sync, 'next');

  //   await lib__.setCache(
  //     'find',
  //     { transformCache: r => r.data[0] },
  //     'a1',
  //     { data: [1, 2, 3, 4] } as Response,
  //     observer
  //   );
  //   expect(spyNext).toHaveBeenCalledWith({ data: [1, 2, 3, 4] });
  //   expect(spyDispatch).toHaveBeenCalledWith({ data: [1, 2, 3, 4] });
  // });

  //
  // @todo tests to refactor
  //
  // it('should NOT return network response from `setCache`', async () => {
  //   let lib_ = new PlatformBrowserMock({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {},
  //     storage: {
  //       get: () => Promise.resolve({ data: [1, 2, 3] }),
  //       set: () => Promise.resolve('saved')
  //     } as any
  //   });

  //   lib_.init({
  //     logger: new Logger({
  //       subject: new Subject(),
  //       useLog: false,
  //       useLogTrace: false
  //     })
  //   } as any);

  //   const observer = {
  //     next: () => {},
  //     complete: () => {}
  //   };

  //   const spyDispatch = jest.spyOn(PlatformBrowserMock.prototype, 'dispatch');
  //   spyDispatch.mockClear();

  //   await lib_.setCache(
  //     'find',
  //     { useNetwork: false },
  //     'a1',
  //     {} as Response,
  //     observer
  //   );

  //   expect(spyDispatch).not.toHaveBeenCalled();
  // });

  // it('should NOT call network and return from cache', () => {
  //   let lib_ = new PlatformBrowserMock({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {
  //       http: {
  //         post: () =>
  //           Promise.reject({
  //             message: 'network error'
  //           })
  //       }
  //     },
  //     storage: {
  //       get: () =>
  //         Promise.resolve({
  //           collection: 'foo-collection',
  //           data: { a: 1 },
  //           key: 'a1',
  //           ttl: 155726892352525
  //         }),
  //       set: () => Promise.resolve({})
  //     } as any
  //   });

  //   lib_
  //     .shouldCallNetwork(
  //       {
  //         useNetwork: false
  //       },
  //       'a1'
  //     )
  //     .then(r =>
  //       expect(r).toEqual({
  //         cache: {
  //           collection: 'foo-collection',
  //           data: { a: 1 },
  //           key: 'a1',
  //           ttl: 155726892352525
  //         },
  //         now: false
  //       })
  //     );
  // });
});
