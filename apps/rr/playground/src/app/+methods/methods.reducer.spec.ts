import { MethodsLoaded } from './methods.actions';
import {
  MethodsState,
  Entity,
  initialState,
  methodsReducer
} from './methods.reducer';

describe('Methods Reducer', () => {
  const getMethodsId = it => it['id'];
  let createMethods;

  beforeEach(() => {
    createMethods = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Methods actions ', () => {
    it('should return set the list of known Methods', () => {
      const methodss = [
        createMethods('PRODUCT-AAA'),
        createMethods('PRODUCT-zzz')
      ];
      const action = new MethodsLoaded(methodss);
      const result: MethodsState = methodsReducer(initialState, action);
      const selId: string = getMethodsId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = methodsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
