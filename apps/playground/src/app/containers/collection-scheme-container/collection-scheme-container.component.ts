import { Component, OnInit } from '@angular/core';
import { PlayCollection } from '../../interfaces/collection.interface';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { PlayState } from '../../+state/play.state';

@Component({
  selector: 'play-collection-scheme-container',
  templateUrl: './collection-scheme-container.component.html',
  styleUrls: ['./collection-scheme-container.component.css']
})
export class CollectionSchemeContainerComponent implements OnInit {
  @Select(PlayState.selectedCollection) selectedCollection$: Observable<
    PlayCollection
  >;

  constructor() {}

  ngOnInit() {}
}
