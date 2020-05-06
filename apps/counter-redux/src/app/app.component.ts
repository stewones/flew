import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { dispatch, connect, getState } from '@reative/state';
import { delayedIncrement } from './actions/delayedIncrement';
import { delayedDecrement } from './actions/delayedDecrement';

@Component({
  selector: 'reative-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  display$ = connect<number>('counter');
  displayDetailed$ = connect<number>('counter', { detailed: true });

  constructor() {
    console.log('initial state', getState());
  }

  ngOnInit() {}

  increment() {
    dispatch({ type: 'INCREMENT', payload: 1 });
  }

  decrement() {
    dispatch({ type: 'DECREMENT', payload: 1 });
  }

  incrementAsync(seconds) {
    dispatch(delayedIncrement(seconds));
  }

  decrementAsync(seconds) {
    dispatch(delayedDecrement(seconds));
  }
}
