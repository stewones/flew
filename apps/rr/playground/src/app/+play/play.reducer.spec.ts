// import { PlayLoaded } from './play.actions';
// import { PlayState, Entity, initialState, playReducer } from './play.reducer';

// describe('Play Reducer', () => {
//   const getPlayId = it => it['id'];
//   let createPlay;

//   beforeEach(() => {
//     createPlay = (id: string, name = ''): Entity => ({
//       id,
//       name: name || `name-${id}`
//     });
//   });

//   describe('valid Play actions ', () => {
//     it('should return set the list of known Play', () => {
//       const plays = [createPlay('PRODUCT-AAA'), createPlay('PRODUCT-zzz')];
//       const action = new PlayLoaded(plays);
//       const result: PlayState = playReducer(initialState, action);
//       const selId: string = getPlayId(result.list[1]);

//       expect(result.loaded).toBe(true);
//       expect(result.list.length).toBe(2);
//       expect(selId).toBe('PRODUCT-zzz');
//     });
//   });

//   describe('unknown action', () => {
//     it('should return the initial state', () => {
//       const action = {} as any;
//       const result = playReducer(initialState, action);

//       expect(result).toBe(initialState);
//     });
//   });
// });
