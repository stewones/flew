import { decrement } from './decrement';

export function delayedDecrement(seconds) {
  // dispatch and getState are filled in by redux-thunk
  return function(dispatch, getState) {
    console.log('state before delayedDecrement', getState());
    setTimeout(() => {
      dispatch(decrement(1));
      console.log('state after delayedDecrement', getState());
    }, seconds * 1000);
  };
}
