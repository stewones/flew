export function useCache(value) {
  return {
    type: 'CONTROL_USE_CACHE',
    payload: value
  };
}
