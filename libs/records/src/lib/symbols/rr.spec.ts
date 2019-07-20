import { Reactive } from './rr';

describe('RRSymbol', () => {
  it('should dispatch payloads to store', () => {
    const spy = jest.spyOn(Reactive.store.sync, 'next');
    Reactive.store.sync.next(`rr rulez!`);
    expect(spy).toBeCalledWith(`rr rulez!`);
  });

  // it('should get options', () => {
  //   expect(optionGet()).toEqual({ driver: 'firestore' });
  // });

  // it('should set options', () => {
  //   optionSet({ useLog: false });
  //   expect(Reactive.options.useLog).toBe(false);
  // });

  // it('should get store', () => {
  //   expect(storeGet()).toBeTruthy();
  // });

  // it('should set store', () => {
  //   const store = { _: 'ngxs' };
  //   storeSet(store);
  //   expect(Reactive.store).toBe(store);
  // });

  // @todo move to rr state
  // it('should return a state response from a key', () => {
  //   expect(
  //     key('kitty')({
  //       ReactiveState: {
  //         responses: [{ key: 'kitty', data: { name: 'kitty', color: 'grey' } }]
  //       }
  //     })
  //   ).toBeTruthy();

  //   expect(
  //     key('kitty', true)({
  //       ReactiveState: {
  //         responses: [{ key: 'kitty', data: { name: 'kitty', color: 'grey' } }]
  //       }
  //     })
  //   ).toEqual({ name: 'kitty', color: 'grey' });
  // });
});
