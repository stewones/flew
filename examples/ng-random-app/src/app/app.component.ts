import { Component } from '@angular/core';
import { fetch } from '@flew/network';
import { guid, subscribe, publish } from '@flew/core';
import { setCache, getCache } from '@flew/cache';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'random-app';

  async ngOnInit() {
    /**
     * gernerate universal id
     */
    console.log('guid()', guid());

    /**
     * events driven subscription
     */
    subscribe('searchSmallGifCats', them =>
      console.log('searchSmallGifCats', them),
    );

    /**
     * simple get request from http driver
     * which publishes results to the earlier subscribed event
     */
    fetch('kitty', {
      silent: false, // show logs
      baseURL: 'https://api.thecatapi.com',
      endpoint: '/v1',
    })
      .from('http') // use http driver
      .get('/images/search?size=small&mime_types=gif')
      .subscribe(
        cats => publish('searchSmallGifCats', cats),
        err => console.log(err),
      );

    await setCache('oi', 'hello');
    console.log(132, await getCache('oi'));
  }
}
