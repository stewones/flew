import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { dispatch } from '@rebased/state';
import { navigateEnd } from './actions/navigateEnd';
import { subscribe } from '@rebased/core';

@Component({
  selector: 'rebased-todo',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    subscribe('navigateTo', pathname =>
      this.router.navigate([pathname]).then(() => dispatch(navigateEnd()))
    );
  }
}
