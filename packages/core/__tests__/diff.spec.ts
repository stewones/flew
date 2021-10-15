import { diff } from '../src';

describe('Diff', () => {
  it('should differentiate primitive objects', () => {
    const from = { a: 1, b: 2, c: 3 };
    const to = { c: 4, d: 5, a: 1 };

    expect(diff(from, to)).toEqual({ b: 2, c: 3 });
  });

  it('should differentiate non-primitive objects', () => {
    const from = { a: { x: 1, y: 2, z: 3 }, b: 2, c: 3 };
    const to = { c: 4, d: 5, a: 1 };

    expect(diff(from, to)).toEqual({ a: { x: 1, y: 2, z: 3 }, b: 2, c: 3 });
  });

  it('should differentiate nested non-primitive objects', () => {
    const from = {
      a: { w: { r: 'l' } },
      b: { x: { r: 'e' } },
      c: { y: { r: 'e' } },
      d: { z: { r: 't' } },
    };
    const to = {
      a: { w: { r: 'c' } },
      b: { x: { r: 'o' } },
      c: { y: { r: 'd' } },
      d: { z: { r: 'e' } },
    };

    expect(diff(from, to)).toEqual({
      a: { w: { r: 'l' } },
      b: { x: { r: 'e' } },
      c: { y: { r: 'e' } },
      d: { z: { r: 't' } },
    });
  });
});
