import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayResponse } from '../../interfaces/play.interface';
import { Store, select } from '@ngrx/store';
import { getAllCollectionResponses } from '../../+play/response/response.selectors';
import { PlayState } from '../../+play/play.reducer';

@Component({
  selector: 'rr-play-collection-response-container',
  templateUrl: './collection-response-container.component.html',
  styleUrls: ['./collection-response-container.component.css']
})
export class CollectionResponseContainerComponent implements OnInit {
  responses$: Observable<PlayResponse[]> = this.store.pipe(
    select(getAllCollectionResponses)
  );

  constructor(private store: Store<PlayState>) {}

  ngOnInit() {}
}
