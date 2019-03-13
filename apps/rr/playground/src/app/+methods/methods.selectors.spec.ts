import { Entity, MethodsState } from './methods.reducer';
import { methodsQuery } from './methods.selectors';

describe('Methods Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getMethodsId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createMethods = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      methods: {
        list: [
          createMethods('PRODUCT-AAA'),
          createMethods('PRODUCT-BBB'),
          createMethods('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Methods Selectors', () => {
    it('getAllMethods() should return the list of Methods', () => {
      const results = methodsQuery.getAllMethods(storeState);
      const selId = getMethodsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedMethods() should return the selected Entity', () => {
      const result = methodsQuery.getSelectedMethods(storeState);
      const selId = getMethodsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = methodsQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = methodsQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
