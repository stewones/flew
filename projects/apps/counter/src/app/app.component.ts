import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { dispatch, connect, getState } from '@rebased/state';
import { delayedIncrement } from './actions/delayedIncrement';
import { delayedDecrement } from './actions/delayedDecrement';
import { increment } from './actions/increment';
import { decrement } from './actions/decrement';

@Component({
  selector: 'rebased-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  display$ = connect<number>('counter');
  displayDetailed$ = connect<number>('counter', { context: true });

  constructor() {
    console.log('initial state', getState());
  }

  ngOnInit() {}

  increment() {
    dispatch(increment(1));
  }

  decrement() {
    dispatch(decrement(1));
  }

  incrementAsync(seconds) {
    dispatch(delayedIncrement(seconds));
  }

  decrementAsync(seconds) {
    dispatch(delayedDecrement(seconds));
  }
}
