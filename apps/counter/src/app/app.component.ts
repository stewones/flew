import { Component, OnInit } from '@angular/core';

import { select, setState, getState } from '@reative/state';
@Component({
  selector: 'reative-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  display$ = select<number>('counter');

  constructor() {}

  ngOnInit() {
    setState(`counter`, 420);
  }

  increment() {
    setState(`counter`, getState(`counter`) + 1);
  }

  decrement() {
    setState(`counter`, getState(`counter`) - 1);
  }
}
