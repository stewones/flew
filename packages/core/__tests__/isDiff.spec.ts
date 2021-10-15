import { isDiff } from '../src';

describe('isDiff', () => {
  it('should differentiate based on emptiness of *from*', () => {
    const from = [];
    const to = [1];
    expect(isDiff(from, to)).toEqual(true);
  });

  it('should enforce difference even when *from* and *to* are empty', () => {
    const from = [];
    const to = [];
    expect(isDiff(from, to)).toEqual(true);
  });

  it('should differentiate based on length', () => {
    const from = [1, 2, 3];
    const to = [1];
    expect(isDiff(from, to)).toEqual(true);
  });

  it('should differentiate based on non-emptiness', () => {
    const from = [1, 2, 3];
    const to = [4, 5, 6];
    expect(isDiff(from, to)).toEqual(true);
  });
});
