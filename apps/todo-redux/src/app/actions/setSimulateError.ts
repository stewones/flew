export function setSimulateError(value) {
  return {
    type: 'CONTROL_SIMULATE_HTTP_ERROR',
    payload: value
  };
}
