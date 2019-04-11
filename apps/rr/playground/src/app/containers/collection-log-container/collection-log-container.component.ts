import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from '@firetask/reactive-record';
import { Select } from '@ngxs/store';
import { PlayState } from '../../+state/play.state';

@Component({
  selector: 'rr-play-collection-log-container',
  templateUrl: './collection-log-container.component.html',
  styleUrls: ['./collection-log-container.component.css']
})
export class CollectionLogContainerComponent implements OnInit {
  @Select(PlayState.logs) logs$: Observable<Log[]>;
  @Select(PlayState.isLogTrace) trace$: Observable<Log>;

  constructor() {}

  ngOnInit() {}
}
