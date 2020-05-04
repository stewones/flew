declare var window;

// full list of options at
// https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
export function applyDevTools(options?: any) {
  return (
    (window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(options)) ||
    undefined
  );
}
