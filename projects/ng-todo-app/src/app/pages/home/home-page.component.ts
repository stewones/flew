import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FlewDriverOption } from '@flew/core';
import { fetch } from '@flew/network';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    ['firestore', 'firebase', 'http'].map(driver =>
      fetch('kitty', {
        silent: true, // show logs
        baseURL: 'https://api.thecatapi.com', // http only
        endpoint: '/v1', // http only
        pathname: '/images/search', // http only
      })
        .from(driver as FlewDriverOption)
        .where('size', '==', 'small')
        .where('mime_types', '==', 'gif')
        .size(1)
        .find()
        .subscribe({
          next: kitty => console.log(kitty, 'from', driver),
          error: err => console.log(err, 'from', driver),
        }),
    );
  }
}
