import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PlayCache } from '../../interfaces/play.interface';
import { AppService } from '../../services/app.service';
import { Reative } from '@reative/records';

declare var window;

@Component({
  selector: 'play-cache-explorer-container',
  templateUrl: './cache-explorer-container.component.html',
  styleUrls: ['./cache-explorer-container.component.css']
})
export class CacheExplorerContainerComponent implements OnInit, OnDestroy {
  data: PlayCache[] = [];

  loadCache$: Subscription;
  clearCache$: Subscription;

  constructor(private app: AppService) {}

  ngOnInit() {
    this.loadCache();
    this.loadCache$ = this.app.loadCache$.subscribe(() => this.loadCache());
    this.clearCache$ = this.app.clearCache$.subscribe(() => this.clearCache());
  }

  ngOnDestroy() {
    this.loadCache$.unsubscribe();
    this.clearCache$.unsubscribe();
  }

  loadCache() {
    this.data = [];
    this.app.$collection.init();
    Reative.storage.forEach((value, key, index) => {
      const className = `cache-tree-${index}`;
      const cache: PlayCache = {
        key: key,
        data: value,
        collection: value.collection
      };
      this.data.push(cache);

      // console.log(className, value, key, index);

      setTimeout(() => {
        window.jsonTreeViewer(className).parse(cache.data);
      }, 0);
    });
  }

  clearCache() {
    this.app.$collection.clearCache();
    this.data = [];
  }
}
