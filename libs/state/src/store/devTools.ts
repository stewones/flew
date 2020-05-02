declare var window;

// full list of options at
// https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
export function applyDevTools(active: boolean, options?: any) {
  return (
    active &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(options)
  );
}
