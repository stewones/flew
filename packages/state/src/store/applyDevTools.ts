import { applyMiddleware, compose } from 'redux/es/redux';
import thunk from 'redux-thunk';

declare var window;

/**
 * Apply Redux DevTools
 * full list of options at
 * https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
 *
 * @export
 * @param {*} [options]
 * @returns {compose}
 */
export function applyDevTools(options?: any) {
  const reduxExtension =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(options);

  let reduxComposer;

  if (options && options.production === false && reduxExtension) {
    reduxComposer = compose(
      // let us dispatch() functions from async actions
      applyMiddleware(thunk),
      // enable chrome devtools
      reduxExtension,
    );
  } else {
    reduxComposer = compose(
      // let us dispatch() functions from async actions
      applyMiddleware(thunk),
    );
  }

  return reduxComposer;
}
