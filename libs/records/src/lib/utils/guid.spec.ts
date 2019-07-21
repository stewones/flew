import { Guid } from './guid';

describe('Utils / GUID', () => {
  it('should make a new id of size 1', () => {
    let id = Guid.make(1);
    expect(id.length).toBe(4);
  });

  it('should make a new id of size 2', () => {
    let id = Guid.make(2);
    expect(id.length).toBe(8);
  });

  it('should make a new id of long size', () => {
    let id = Guid.make();
    expect(id.length).toBe(36);
  });

  it('should make ids of type string', () => {
    let id = Guid.make(1);
    expect(typeof id).toBe('string');

    id = Guid.make(2);
    expect(typeof id).toBe('string');

    id = Guid.make();
    expect(typeof id).toBe('string');
  });
});
