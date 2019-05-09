import { isEmpty, isEqual, isArray, isObject, merge, get } from 'lodash';
import { PartialObserver, Observable, from, of, merge as merge$ } from 'rxjs';
import { map, switchMap, filter, catchError } from 'rxjs/operators';
import { Options, Chain } from '../interfaces/options';
import { Response } from '../interfaces/response';
import { ReactiveRecord } from './server';
import { StorageAdapter } from '../interfaces/storage';
import { Config } from '../symbols/rr';
import { ReactiveVerb } from '../interfaces/verb';
import { clearNetworkResponse } from '../utils/response';

export class PlatformBrowser extends ReactiveRecord {
  protected storage: StorageAdapter; // storage adapter (see ionic storage for reference)

  constructor(options: Options) {
    super(options);
    merge(this, options);

    if (!this.storage && options.chain && options.chain.useCache)
      throw new Error('missing storage instance');
  }

  public clearCache(): void {
    this.storage.clear();
  }

  public feed() {
    const storage =
      !isEmpty(Config.options) && Config.options.storage
        ? Config.options.storage
        : false;

    if (storage) {
      storage.forEach((value, key, index) => {
        if (value.collection === this.collection) {
          Config.store.dispatch.next(value);
        }
      });
    }
  }

  public get<T extends Response>(path: string = ''): Observable<T> {
    return this.call('get', path);
  }

  public post<T extends Response>(
    path: string = '',
    body: any = {}
  ): Observable<T> {
    return this.call('post', path, body);
  }

  public patch<T extends Response>(
    path: string = '',
    body: any = {}
  ): Observable<T> {
    return this.call('patch', path, body);
  }

  public find<T extends Response>(): Observable<T> {
    return this.call('find');
  }

  public findOne<T extends Response>(): Observable<T> {
    return this.call('findOne');
  }

  private shouldTransformResponse(chain: Chain, response: Response) {
    let transformResponse: any =
      chain.transformResponse && typeof chain.transformResponse === 'function'
        ? chain.transformResponse
        : (data: Response) => data;

    if (chain.transformData) {
      //
      // transform elastic data
      const hits = get(response, 'data.hits.hits');
      if (hits) {
        transformResponse = (data: Response) =>
          data.data.hits.hits.map(h => h._source);
      } else {
        //
        // default
        transformResponse = (data: Response) => data.data;
      }
    }

    return transformResponse;
  }

  protected call<T extends Response>(
    method: ReactiveVerb,
    path: string = '',
    payload: any = {}
  ): Observable<T> {
    // re-init so we can have access to stuff like `storage`
    super.init({
      driver: super.getDriver()
    });

    //
    //
    const key = super.createKey(path, payload);
    const chain = super.cloneChain();

    //
    // reset for the next call
    super.reset();

    //
    // request
    return new Observable((observer: PartialObserver<T>) => {
      this.shouldCallNetwork(chain, key).then(evaluation =>
        merge$(
          this.cache$(observer, chain, key),
          this.ttl$(evaluation, observer, chain, key),
          this.network$(evaluation, observer, method, path, payload, chain, key)
        ).subscribe()
      );
    });
  }

  protected network$<T>(
    evaluation,
    observer,
    method,
    path,
    payload,
    chain,
    key
  ) {
    return of(evaluation).pipe(
      filter(evaluation => evaluation.now === true),
      switchMap(() =>
        super.call<T>(method, path, payload, chain, key).pipe(
          map(response => {
            this.setCache(chain, key, response, observer);
          }),
          catchError(err => observer.error(err))
        )
      )
    );
  }

  protected ttl$<T>(evaluation, observer, chain, key) {
    return of(evaluation).pipe(
      map(evaluation => {
        if (!evaluation.now) {
          super.log().danger()(
            `${key} [call] there is a cached response with time to live`
          );
          observer.next(
            this.shouldTransformResponse(chain, evaluation.cache)(
              evaluation.cache as T
            )
          );
          observer.complete();
        }
      })
    );
  }

  protected cache$<T>(observer, chain, key) {
    return from(this.shouldReturnCache(chain, key, observer));
  }

  protected shouldCallNetwork(
    chain: Chain,
    key: string
  ): Promise<{ now: boolean; cache?: Response }> {
    return new Promise(async resolve => {
      const useCache: boolean = chain.useCache === false ? false : true;
      const useNetwork: boolean = chain.useNetwork === false ? false : true;

      //
      // check for TTL
      // should not call network
      const seconds = new Date().getTime() / 1000 /*/ 60 / 60 / 24 / 365*/;

      //
      // avoid the return of any cache (jump to network request at server level)
      if (useCache === false && useNetwork !== false)
        return resolve({
          now: true
        });

      const cache: Response & { ttl: number } | any = await this.storage.get(
        key
      );

      //
      // stop network request at server level
      if (useCache && (cache && seconds < cache.ttl) && !isEmpty(cache.data)) {
        return resolve({
          now: false,
          cache: cache
        });
      }

      return resolve({
        now: true
      });
    });
  }

  protected async shouldReturnCache(
    chain: Chain,
    key: string,
    observer: PartialObserver<any>
  ) {
    const useCache: boolean = chain.useCache === false ? false : true;
    super.log().info()(`${key} [should] useCache? ${useCache ? true : false}`);

    if (useCache === false) return Promise.resolve();

    const cache: Response & { ttl: number } | any = await this.storage.get(key);
    const transformResponse: any = this.shouldTransformResponse(chain, cache);
    super.log().info()(
      `${key} [should] hasCache? ${!isEmpty(cache) ? true : false}`
    );
    super.log().info()(
      `${key} [should] transformResponse? ${
        (chain.transformResponse &&
          typeof chain.transformResponse === 'function') ||
        chain.transformData
          ? true
          : false
      }`
    );

    //
    // return cached response immediately to view
    if (
      (useCache && cache && !isEmpty(cache.data)) ||
      (useCache && isArray(cache) && !isEmpty(cache)) ||
      (useCache && isObject(cache) && !isEmpty(cache))
    ) {
      const response = transformResponse(cache);
      observer.next(response);
    }
  }

  protected async setCache(
    chain: Chain,
    key: string,
    network: Response & { ttl?: number },
    observer: PartialObserver<any>
  ) {
    const cache: Response & { ttl?: number } = await this.storage.get(key);
    const transformCache: any =
      chain.transformCache && typeof chain.transformCache === 'function'
        ? chain.transformCache
        : (data: Response) => data;

    const transformResponse: any = this.shouldTransformResponse(chain, network);
    const saveNetwork: boolean = chain.saveNetwork === false ? false : true;
    const useNetwork: boolean = chain.useNetwork === false ? false : true;

    super.log().info()(
      `${key} [set] hasCache? ${!isEmpty(cache) ? true : false}`
    );
    super.log().info()(
      `${key} [set] transformCache? ${
        chain.transformCache && typeof chain.transformCache === 'function'
          ? true
          : false
      }`
    );
    super.log().info()(
      `${key} [set] transformResponse? ${
        (chain.transformResponse &&
          typeof chain.transformResponse === 'function') ||
        chain.transformData
          ? true
          : false
      }`
    );
    super.log().info()(`${key} [set] useNetwork? ${useNetwork ? true : false}`);
    super.log().info()(
      `${key} [set] saveNetwork? ${saveNetwork ? true : false}`
    );

    //
    // defaults to return network response only if different from cache
    if (
      (cache && !isEqual(cache.data, network.data)) ||
      (cache && isEmpty(cache.data)) ||
      isEmpty(cache) ||
      isEmpty(network.data) ||
      useNetwork !== false
    ) {
      //
      // return network response
      observer.next(transformResponse(network));

      // dispatch to store
      if (network && network.data)
        Config.store.dispatch.next(clearNetworkResponse(network));
    }

    //
    // cache strategy
    if (saveNetwork) {
      let ttl = chain.ttl || 0;
      const seconds = new Date().getTime() / 1000 /*/ 60 / 60 / 24 / 365*/;

      if (!isEqual(cache, network)) {
        super.log().warn()(`${key} [set] cache updated`);

        if (ttl > 0) {
          ttl += seconds;
          network.ttl = ttl;
        }

        //
        // set cache response
        observer.complete();
        return this.storage.set(
          key,
          transformCache(clearNetworkResponse(network))
        );
      }
    }

    return observer.complete();
  }
}
