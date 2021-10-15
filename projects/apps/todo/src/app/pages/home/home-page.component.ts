import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { fetch } from '@rebased/core';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    ['firestore', 'firebase', 'http'].map(driver =>
      fetch('kitty', {
        silent: true, // show logs
        baseURL: 'https://api.thecatapi.com', // http only
        endpoint: '/v1', // http only
        pathname: '/images/search' // http only
      })
        .from(driver)
        .where('size', '==', 'small')
        .where('mime_types', '==', 'gif')
        .size(1)
        .find()
        .subscribe(
          kitty => console.log(kitty, 'from', driver),
          err => console.log(err, 'from', driver)
        )
    );
  }
}
