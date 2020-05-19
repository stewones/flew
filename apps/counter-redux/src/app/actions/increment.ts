export function increment(seconds: number) {
  return {
    type: 'INCREMENT',
    payload: seconds // could be any other name rather than payload
  };
}
