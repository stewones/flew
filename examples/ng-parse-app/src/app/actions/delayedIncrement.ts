import { increment } from './increment';

export function delayedIncrement(seconds) {
  // dispatch and getState are filled in by redux-thunk
  return function(dispatch, getState) {
    console.log('state before delayedIncrement', getState());
    setTimeout(() => {
      dispatch(increment(1));
      console.log('state after delayedIncrement', getState());
    }, seconds * 1000);
  };
}
