import { Component, OnInit } from '@angular/core';

import { select, setState, getState } from '@reative/state';
@Component({
  selector: 'reative-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  display$ = select<number>('counter');
  displayTree$ = select<{ total: number }>('counter-tree');

  constructor() {}

  ngOnInit() {
    setState(`counter`, 420);
    setState(`counter-tree`, { total: 210 });
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
}
