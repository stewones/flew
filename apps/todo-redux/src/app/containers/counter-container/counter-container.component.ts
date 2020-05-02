import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  createStore,
  store,
  dispatch,
  connect,
  applyDevTools
} from '@reative/state';
import { compose, applyMiddleware } from 'redux';

declare var window;

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// logger middleware example
const logger = store => next => action => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};
@Component({
  selector: 'counter-container',
  templateUrl: './counter-container.component.html',
  styleUrls: ['./counter-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterContainerComponent implements OnInit {
  display$ = connect<number>('counter', { raw: false }); // default raw is false

  constructor() {
    createStore(
      // list of reducers
      { counter },
      // initial state
      { counter: 420 },
      // enhancers
      applyDevTools(true)
      // composing enhancers
      // compose(applyDevTools(true), applyMiddleware(logger))
    );
    console.log('initial state', store().getState());
    // store().subscribe(it => console.log(it, store().getState()));
  }

  ngOnInit() {}

  increment() {
    dispatch({ type: 'INCREMENT' });
  }

  decrement() {
    dispatch({ type: 'DECREMENT', someExtraActionField: 123 });
  }
}
