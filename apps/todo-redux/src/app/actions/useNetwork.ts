export function useNetwork(value) {
  return {
    type: 'CONTROL_USE_NETWORK',
    payload: value
  };
}
