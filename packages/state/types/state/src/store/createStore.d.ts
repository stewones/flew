/**
 * Create custom redux store
 * @example
 * import {
 *   createStore,
 *   createReducer,
 *   applyDevTools,
 *   applyMiddleware
 * } from '@flew/state';
 *
 * export const counter = createReducer(0, {
 *   increment: (state, action) => state + action.payload,
 *   decrement: (state, action) => state - action.payload
 * });
 *
 *  // logger middleware example
 *  const logger = store => next => action => {
 *    console.log('dispatching', action);
 *    const result = next(action);
 *    console.log('next state', store.getState());
 *    return result;
 *  };
 *
 *  createStore(
 *    // list of reducers
 *    { counter },
 *    // initial state
 *    { counter: 420 },
 *    // composing enhancers
 *    compose(applyDevTools({ production: false }), applyMiddleware(logger))
 *  );
 *
 *  store().subscribe(it => console.log(it, store().getState()));
 *
 * @export
 * @param {*} reducers
 * @param {*} initialState
 * @param {*} [enhancers]
 */
export declare function createStore(reducers: any, enhancers?: any): any;
export declare function createStore(reducers: any, initialState?: any, enhancers?: any): any;
/**
 * Retrieve Flew store instance
 *
 * @export
 * @returns {FlewStore}
 */
export declare function store(): any;
