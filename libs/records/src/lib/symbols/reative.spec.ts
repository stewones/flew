import { Reative } from './reative';

describe('RRSymbol', () => {
  it('should dispatch payloads to store', () => {
    const spy = jest.spyOn(Reative.store.sync, 'next');
    Reative.store.sync.next(`rr rulez!`);
    expect(spy).toBeCalledWith(`rr rulez!`);
  });

  // it('should get options', () => {
  //   expect(optionGet()).toEqual({ driver: 'firestore' });
  // });

  // it('should set options', () => {
  //   optionSet({ useLog: false });
  //   expect(Reative.options.useLog).toBe(false);
  // });

  // it('should get store', () => {
  //   expect(storeGet()).toBeTruthy();
  // });

  // it('should set store', () => {
  //   const store = { _: 'ngxs' };
  //   storeSet(store);
  //   expect(Reative.store).toBe(store);
  // });

  // @todo move to rr state
  // it('should return a state response from a key', () => {
  //   expect(
  //     key('kitty')({
  //       State: {
  //         responses: [{ key: 'kitty', data: { name: 'kitty', color: 'grey' } }]
  //       }
  //     })
  //   ).toBeTruthy();

  //   expect(
  //     key('kitty', true)({
  //       State: {
  //         responses: [{ key: 'kitty', data: { name: 'kitty', color: 'grey' } }]
  //       }
  //     })
  //   ).toEqual({ name: 'kitty', color: 'grey' });
  // });
});
