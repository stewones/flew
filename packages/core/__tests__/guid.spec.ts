import { guid } from '../src';

describe('Guid', () => {
  it('should make a new id of size 1', () => {
    const id = guid(1);
    expect(id.length).toBe(4);
  });

  it('should make a new id of size 2', () => {
    const id = guid(2);
    expect(id.length).toBe(8);
  });

  it('should make a new id of size 3', () => {
    const id = guid(3);
    expect(id.length).toBe(12);
  });

  it('should make a new id of size 4', () => {
    const id = guid(4);
    expect(id.length).toBe(16);
  });

  it('should make a new id of long size', () => {
    const id = guid();
    expect(id.length).toBe(36);
  });

  it('should make ids of type string', () => {
    let id = guid(1);
    expect(typeof id).toBe('string');

    id = guid(2);
    expect(typeof id).toBe('string');

    id = guid();
    expect(typeof id).toBe('string');
  });
});
