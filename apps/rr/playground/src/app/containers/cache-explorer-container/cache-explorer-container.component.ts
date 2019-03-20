import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayCache } from '../../interfaces/play.interface';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { AppService } from '../../services/app.service';

declare var window;

@Component({
  selector: 'rr-play-cache-explorer-container',
  templateUrl: './cache-explorer-container.component.html',
  styleUrls: ['./cache-explorer-container.component.css']
})
export class CacheExplorerContainerComponent implements OnInit, OnDestroy {
  data: PlayCache[] = this.resetCache();

  loadCachedResponse$: Subscription;
  clearCachedResponse$: Subscription;

  constructor(private app: AppService) {}

  ngOnInit() {
    this.loadCache();
    this.loadCachedResponse$ = this.app.loadCachedResponse$.subscribe(() =>
      this.loadCache()
    );
    this.clearCachedResponse$ = this.app.clearCachedResponse$.subscribe(() =>
      this.clearCache()
    );
  }

  ngOnDestroy() {
    this.loadCachedResponse$.unsubscribe();
  }

  resetCache(): PlayCache[] {
    return [];
  }

  loadCache() {
    this.data = [];
    this.app.$collection.storage.forEach((value, key, index) => {
      const className = `cache-tree-${index}`;
      const cache: PlayCache = {
        key: key,
        data: value
      };
      this.data.push(cache);

      console.log(className, value, key, index);

      setTimeout(() => {
        window.jsonTreeViewer(className).parse(cache.data);
      }, 0);
    });
  }

  clearCache() {
    this.app.$collection.clearCache();
    this.data = this.resetCache();
  }
}
