import { HttpDriver } from './http';
import { Logger } from '../utils/logger';
import { Reative } from '../symbols/reative';

describe('HttpDriver', () => {
  let driver: HttpDriver;
  Reative.connector = {};
  beforeEach(() => {
    driver = new HttpDriver({} as any);
  });

  it('should be created using minimal setup', () => {
    expect(driver).toBeTruthy();
    driver = new HttpDriver({});
    expect(driver).toBeTruthy();
  });

  it('should be able to use a different http connector', () => {
    Reative.connector = {
      http: { x: 'any other http instance' }
    };
    driver = new HttpDriver({} as any);
    expect(driver.connector).toBeTruthy();
  });

  it('should have a `get` verb', () => {
    Reative.connector = {};
    driver = new HttpDriver({
      baseURL: 'http://google.com',
      endpoint: '/'
    } as any);
    expect(driver.get().toPromise()).toBeTruthy();
    expect(driver.get('/', 'key').toPromise()).toBeTruthy();
  });

  it('should have a `post` verb', () => {
    Reative.connector = {};
    driver = new HttpDriver({
      baseURL: 'http://google.com',
      endpoint: '/'
    } as any);
    expect(driver.post().toPromise()).toBeTruthy();
    expect(driver.post('/', 'key', {}).toPromise()).toBeTruthy();
  });

  it('should have a `patch` verb', () => {
    Reative.connector = {};
    driver = new HttpDriver({
      baseURL: 'http://google.com',
      endpoint: '/'
    } as any);
    expect(driver.patch().toPromise()).toBeTruthy();
    expect(driver.patch('/', 'key', {}).toPromise()).toBeTruthy();
  });

  it('should have a `delete` verb', () => {
    Reative.connector = {};
    driver = new HttpDriver({
      baseURL: 'http://google.com',
      endpoint: '/'
    } as any);
    expect(driver.delete().toPromise()).toBeTruthy();
    expect(driver.delete('/', 'key').toPromise()).toBeTruthy();
  });

  it('should implement the `log` method', () => {
    Reative.connector = {};
    driver = new HttpDriver({
      baseURL: 'http://google.com',
      endpoint: '/',

      logger: new Logger({} as any)
    } as any);

    expect(typeof driver.log).toBeTruthy();
  });

  it('should fail when no endpoint is provided', () => {
    Reative.connector = {};
    driver = new HttpDriver({
      baseURL: 'http://google.com'
    } as any);
    expect(() => {
      driver.get().toPromise();
    }).toThrowError(`endpoint required for [get]`);
  });

  it('should respond with success', () => {
    Reative.connector = {
      http: {
        get: () =>
          Promise.resolve({
            data: [1, 2, 3]
          })
      }
    };
    driver = new HttpDriver({
      baseURL: 'http://google.com',
      endpoint: '/'
    } as any);

    driver
      .get()
      .toPromise()
      .then(r => {
        expect(r).toEqual({
          data: [1, 2, 3],
          response: {},
          key: '',
          collection: '',
          driver: 'http'
        });
      });
    Reative.connector = {
      http: {
        get: () => Promise.resolve([1, 2, 3])
      }
    };
    driver = new HttpDriver({
      baseURL: 'http://google.com',
      endpoint: '/'
    } as any);

    driver
      .get()
      .toPromise()
      .then(r => {
        expect(r).toEqual({
          data: [1, 2, 3],
          response: [1, 2, 3],
          key: '',
          collection: '',
          driver: 'http'
        });
      });
    Reative.connector = {
      http: {
        get: () => Promise.resolve('okay')
      }
    };
    driver = new HttpDriver({
      baseURL: 'http://google.com',
      endpoint: '/'
    } as any);

    driver
      .get()
      .toPromise()
      .then(r => {
        expect(r).toEqual({
          data: 'okay',
          response: {},
          key: '',
          collection: '',
          driver: 'http'
        });
      });
  });

  it('should respond with error', () => {
    Reative.connector = {
      http: {
        get: () =>
          Promise.reject({
            response: { data: { message: 'error object', code: 54 } }
          })
      }
    };
    driver = new HttpDriver({
      baseURL: 'http://google.com',
      endpoint: '/'
    } as any);

    driver
      .get()
      .toPromise()
      .then(
        () => {},
        err => {
          expect(err).toEqual({ code: 54, message: 'error object' });
        }
      );
    Reative.connector = {
      http: {
        get: () => Promise.reject('error string')
      }
    };
    driver = new HttpDriver({
      baseURL: 'http://google.com',
      endpoint: '/'
    } as any);

    driver
      .get()
      .toPromise()
      .then(
        () => {},
        err => {
          expect(err).toEqual('error string');
        }
      );
  });
});
