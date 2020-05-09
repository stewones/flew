export function simulateError(value) {
  return {
    type: 'CONTROL_SIMULATE_ERROR',
    payload: value
  };
}
