import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { dispatch } from '@rebased/state';
import { navigateEnd } from './actions/navigateEnd';
import { fetch, subscribe } from '@rebased/core';

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

    // realtime test
    fetch('Todo')
      .driver('parse')
      .where('doc_id', '==', '9fc04dcd92b3')
      .on()
      .subscribe(data => console.log(123, data));
  }
}
