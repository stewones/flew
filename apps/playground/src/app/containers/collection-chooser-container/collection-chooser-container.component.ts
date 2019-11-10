import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, Select } from '@ngxs/store';

import { PlayCollection } from '../../interfaces/collection.interface';
import { PlayState } from '../../+state/play.state';
import { UpdateCollection } from '../../+state/collection/collection.actions';

import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'play-collection-chooser-container',
  templateUrl: './collection-chooser-container.component.html',
  styleUrls: ['./collection-chooser-container.component.css']
})
export class CollectionChooserContainerComponent implements OnInit, OnDestroy {
  @Select(PlayState.collections) collections$: Observable<PlayCollection[]>;

  selectedCollection$: Subscription;
  selectedCollection: PlayCollection = <PlayCollection>{};

  constructor(private store: Store) {}

  ngOnInit() {
    this.selectedCollection$ = this.store
      .select(PlayState.selectedCollection)
      .subscribe((entry: PlayCollection) => (this.selectedCollection = entry));
  }

  ngOnDestroy() {
    this.selectedCollection$.unsubscribe();
  }

  didCollectionChange($event: MatSelectChange) {
    this.store.dispatch(new UpdateCollection($event.value));
  }
}
