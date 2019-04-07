import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from '@firetask/reactive-record';
import { select, Store } from '@ngrx/store';
import { getLogs } from '../../+play/collection/collection.selectors';
import { PlayState } from '../../+play/play.reducer';

@Component({
  selector: 'rr-play-collection-log-container',
  templateUrl: './collection-log-container.component.html',
  styleUrls: ['./collection-log-container.component.css']
})
export class CollectionLogContainerComponent implements OnInit {
  logs$: Observable<Log[]> = this.store.pipe(select(getLogs));

  constructor(private store: Store<PlayState>) {}

  ngOnInit() {}
}
