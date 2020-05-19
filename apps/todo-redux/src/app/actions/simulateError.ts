export function simulateHttpError(value) {
  return {
    type: 'CONTROL_SIMULATE_HTTP_ERROR',
    payload: value
  };
}
