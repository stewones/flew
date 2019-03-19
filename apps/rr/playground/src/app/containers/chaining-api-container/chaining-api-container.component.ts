import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayMethod } from '../../interfaces/method.interface';
import { Store, select } from '@ngrx/store';
import {
  getSelectedMethods,
  getSelectedVerb
} from '../../+play/method/method.selectors';
import { PlayState } from '../../+play/play.reducer';

@Component({
  selector: 'rr-play-chaining-api-container',
  templateUrl: './chaining-api-container.component.html',
  styleUrls: ['./chaining-api-container.component.css']
})
export class ChainingApiContainerComponent implements OnInit {
  selectedMethods$: Observable<PlayMethod[]> = this.store.pipe(
    select(getSelectedMethods)
  );
  selectedVerb$: Observable<PlayMethod> = this.store.pipe(
    select(getSelectedVerb)
  );

  constructor(private store: Store<PlayState>) {}

  ngOnInit() {}
}
