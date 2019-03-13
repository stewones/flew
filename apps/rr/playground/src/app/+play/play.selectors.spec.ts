import { Entity, PlayState } from './play.reducer';
import { playQuery } from './play.selectors';

describe('Play Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPlayId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createPlay = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      play: {
        list: [
          createPlay('PRODUCT-AAA'),
          createPlay('PRODUCT-BBB'),
          createPlay('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Play Selectors', () => {
    it('getAllPlay() should return the list of Play', () => {
      const results = playQuery.getAllPlay(storeState);
      const selId = getPlayId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedPlay() should return the selected Entity', () => {
      const result = playQuery.getSelectedPlay(storeState);
      const selId = getPlayId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = playQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = playQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
