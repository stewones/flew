import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { createStore, store, dispatch, connect } from '@reative/state';

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

@Component({
  selector: 'counter-container',
  templateUrl: './counter-container.component.html',
  styleUrls: ['./counter-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterContainerComponent implements OnInit {
  display$ = connect<number>('counter', { raw: false }); // default raw is false

  constructor() {
    createStore({ counter }, { counter: 420 });
    console.log('initial state', store().getState());
    // store().subscribe(it => console.log(it, store().getState()));
  }

  ngOnInit() {}

  increment() {
    dispatch({ type: 'INCREMENT', a: 1, b: 2 });
  }

  decrement() {
    dispatch({ type: 'DECREMENT', a: 1, b: 2 });
  }
}
