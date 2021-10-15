export function isServer() {
  return typeof module !== 'undefined' && module.exports;
}

export function isOnline() {
  return window.navigator.onLine;
}
