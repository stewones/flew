import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { dispatch, connect, getState } from '@reative/state';

@Component({
  selector: 'reative-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  display$ = connect<number>('counter', { detailed: true }); // default for detailed is false

  constructor() {
    console.log('initial state', getState());
  }

  ngOnInit() {}

  increment() {
    dispatch({ type: 'INCREMENT' });
  }

  decrement() {
    dispatch({ type: 'DECREMENT' });
  }
}
