import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { connect, dispatch, StateMeta } from '@reative/state';
import { navigateEnd } from './actions/navigateEnd';

@Component({
  selector: 'reative-todo-redux-app',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(private router: Router) {
    connect<string>('route.pathname', {
      detailed: true
    }).subscribe((it: StateMeta<string>) =>
      it.next
        ? this.router.navigate([it.next]).then(() => dispatch(navigateEnd()))
        : null
    );
  }
}
