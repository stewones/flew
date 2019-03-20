import { Component, OnInit } from '@angular/core';
import { PlayCollection } from '../../interfaces/collection.interface';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getSelectedCollection } from '../../+play/collection/collection.selectors';
import { PlayState } from '../../+play/play.reducer';

@Component({
  selector: 'rr-play-collection-scheme-container',
  templateUrl: './collection-scheme-container.component.html',
  styleUrls: ['./collection-scheme-container.component.css']
})
export class CollectionSchemeContainerComponent implements OnInit {
  selectedCollection$: Observable<PlayCollection> = this.store.pipe(
    select(getSelectedCollection)
  );

  constructor(private store: Store<PlayState>) {}

  ngOnInit() {}
}
