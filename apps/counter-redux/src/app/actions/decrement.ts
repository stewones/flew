export function decrement(seconds: number) {
  return {
    type: 'DECREMENT',
    payload: seconds // could be any other name rather than payload
  };
}
