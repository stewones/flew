import { Config, optionGet, optionSet, storeGet, storeSet, key } from './rr';

describe('RRSymbol', () => {
  it('should have store with dispatch', () => {
    const spy = jest.spyOn(Config.store, 'dispatch');
    Config.store.dispatch();
    expect(spy).toBeCalled();
  });

  it('should get options', () => {
    expect(optionGet()).toEqual({ driver: 'firestore' });
  });

  it('should set options', () => {
    optionSet({ useLog: false });
    expect(Config.options.useLog).toBe(false);
  });

  it('should get store', () => {
    expect(storeGet()).toBeTruthy();
  });

  it('should set store', () => {
    const store = { _: 'ngxs' };
    storeSet(store);
    expect(Config.store).toBe(store);
  });

  it('should return a state response from a key', () => {
    expect(
      key('kitty')({
        ReactiveState: {
          responses: [{ key: 'kitty', data: { name: 'kitty', color: 'grey' } }]
        }
      })
    ).toBeTruthy();

    expect(
      key('kitty', true)({
        ReactiveState: {
          responses: [{ key: 'kitty', data: { name: 'kitty', color: 'grey' } }]
        }
      })
    ).toEqual({ name: 'kitty', color: 'grey' });
  });
});
