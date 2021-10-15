import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, setState, getState } from '@reative/state';
@Component({
  selector: 'reative-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  display$ = select<number>('counter');
  displayTree$ = select<{ total: number }>('counter-tree');
  displayBoolean$ = select<boolean>('boolean-item');

  constructor() {}

  ngOnInit() {
    setState(`counter`, 420);
    setState(`counter-tree`, { total: 210 });
    setState(`boolean-item`, false);
  }

  increment() {
    setState(`counter`, getState(`counter`) + 1);
  }

  decrement() {
    setState(`counter`, getState(`counter`) - 1);
  }

  incrementTree() {
    setState(`counter-tree`, { total: getState(`counter-tree`).total + 1 });
  }

  decrementTree() {
    setState(`counter-tree`, { total: getState(`counter-tree`).total - 1 });
  }

  active() {
    setState(`boolean-item`, true);
  }

  deactive() {
    setState(`boolean-item`, false);
  }
}
