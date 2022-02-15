import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { dispatch, connect, getState } from '@flew/state';
import { fetch } from '@flew/network';
import { delayedIncrement } from './actions/delayedIncrement';
import { delayedDecrement } from './actions/delayedDecrement';
import { increment } from './actions/increment';
import { decrement } from './actions/decrement';

@Component({
  selector: 'flew-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  display$ = connect<number>('counter');
  displayDetailed$ = connect<number>('counter', { context: true });

  displayFirestoreRealtime = 0;

  constructor(private detector: ChangeDetectorRef) {
    console.log('initial state', getState());
  }

  ngOnInit() {
    this.realtimeFirestoreCounter();
  }

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

  incrementFromFirestore() {
    fetch('counter')
      .from('firestore')
      .doc('some-id')
      .set({ total: this.displayFirestoreRealtime + 1 })
      .toPromise();
  }

  decrementFromFirestore() {
    fetch('counter')
      .from('firestore')
      .doc('some-id')
      .set({ total: this.displayFirestoreRealtime - 1 })
      .toPromise();
  }

  realtimeFirestoreCounter() {
    fetch('counter')
      .from('firestore')
      .state(false)
      .cache(false)
      .on()
      .subscribe(numbers => {
        console.log('realtime counter from firestore', numbers[0]?.total);
        this.displayFirestoreRealtime = numbers[0]?.total;
        this.detector.detectChanges();
      });
  }
}
