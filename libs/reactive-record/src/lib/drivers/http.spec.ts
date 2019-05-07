import { HttpDriver } from './http';
import { Logger } from '../utils/logger';

describe('HttpDriver', () => {
  let driver: HttpDriver;

  beforeEach(() => {
    driver = new HttpDriver({
      connector: {}
    });
  });

  it('should be created using minimal setup', () => {
    expect(driver).toBeTruthy();
  });

  it('should be able to use a different http connector', () => {
    driver = new HttpDriver({
      connector: {
        http: { x: 'any other http instance' }
      }
    });
    expect(driver.connector.x).toBeTruthy();
  });

  it('should have a `get` verb', () => {
    driver = new HttpDriver({
      baseURL: 'http://google.com',
      endpoint: '/',
      connector: {}
    });
    expect(driver.get().toPromise()).toBeTruthy();
    expect(driver.get('/', 'key').toPromise()).toBeTruthy();
  });

  it('should have a `post` verb', () => {
    driver = new HttpDriver({
      baseURL: 'http://google.com',
      endpoint: '/',
      connector: {}
    });
    expect(driver.post().toPromise()).toBeTruthy();
    expect(driver.post('/', 'key', {}).toPromise()).toBeTruthy();
  });

  it('should have a `patch` verb', () => {
    driver = new HttpDriver({
      baseURL: 'http://google.com',
      endpoint: '/',
      connector: {}
    });
    expect(driver.patch().toPromise()).toBeTruthy();
    expect(driver.patch('/', 'key', {}).toPromise()).toBeTruthy();
  });

  it('should have a `delete` verb', () => {
    driver = new HttpDriver({
      baseURL: 'http://google.com',
      endpoint: '/',
      connector: {}
    });
    expect(driver.delete().toPromise()).toBeTruthy();
    expect(driver.delete('/', 'key').toPromise()).toBeTruthy();
  });

  it('should implement the `log` method', () => {
    driver = new HttpDriver({
      baseURL: 'http://google.com',
      endpoint: '/',
      connector: {},
      logger: new Logger({} as any)
    } as any);

    expect(driver.log()).toBeInstanceOf(Logger);
  });

  it('should fail when no baseURL is provided', () => {
    expect(() => {
      driver.get().toPromise();
    }).toThrowError(`baseURL needed for [get]`);
  });

  it('should fail when no endpoint is provided', () => {
    driver = new HttpDriver({
      baseURL: 'http://google.com',
      connector: {}
    });
    expect(() => {
      driver.get().toPromise();
    }).toThrowError(`endpoint required for [get]`);
  });
});
