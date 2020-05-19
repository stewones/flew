export function useMemo(value) {
  return {
    type: 'CONTROL_USE_MEMO',
    payload: value
  };
}
