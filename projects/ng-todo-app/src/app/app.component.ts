import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { dispatch } from '@flew/state';
import { subscribe } from '@flew/core';
import { navigateEnd } from './actions/navigateEnd';
@Component({
  selector: 'flew-todo',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    subscribe('navigateTo', pathname =>
      this.router.navigate([pathname]).then(() => dispatch(navigateEnd())),
    );
  }
}
