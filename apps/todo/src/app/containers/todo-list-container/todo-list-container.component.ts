import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs';
import {
  select,
  createStore,
  applyDevTools,
  store,
  setState,
  getState
} from '@reative/state';

export interface Todo {
  name: string;
}
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
  selector: 'todo-list-container',
  templateUrl: './todo-list-container.component.html',
  styleUrls: ['./todo-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListContainerComponent implements OnInit {
  display$ = select<number>('counter');

  constructor(protected detector: ChangeDetectorRef) {
    // creating store locally rather using StoreModule
    // createStore(
    //   // list of reducers
    //   { counter },
    //   // initial state
    //   { counter: 420 },
    //   // enhancers
    //   applyDevTools()
    //   // composing enhancers
    //   // compose(applyDevTools(), applyMiddleware(logger))
    // );
    // console.log('initial state', store().getState());
    // // store().subscribe(it => console.log(it, store().getState()));
  }

  ngOnInit() {
    setState(`counter`, 420);
  }

  increment() {
    console.log(getState(`counter`));
    setState(`counter`, getState(`counter`) + 1);
  }

  decrement() {
    console.log(getState(`counter`));
    setState(`counter`, getState(`counter`) - 1);
  }
}
