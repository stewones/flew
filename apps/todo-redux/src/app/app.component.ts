import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { connect, dispatch } from '@reative/state';
import { navigateEnd } from './actions/navigateEnd';

@Component({
  selector: 'reative-todo-redux',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(private router: Router) {
    connect<string>('route.pathname').subscribe(it =>
      it ? this.router.navigate([it]).then(() => dispatch(navigateEnd())) : null
    );
  }
}
