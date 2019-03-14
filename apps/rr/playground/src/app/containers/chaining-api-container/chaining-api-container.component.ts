import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Method } from '../../interfaces/method.interface';
import { Store, select } from '@ngrx/store';
import { getSelectedMethods } from '../../+play/method/method.selectors';
import { PlayState } from '../../+play/play.reducer';

@Component({
  selector: 'rr-play-chaining-api-container',
  templateUrl: './chaining-api-container.component.html',
  styleUrls: ['./chaining-api-container.component.css']
})
export class ChainingApiContainerComponent implements OnInit {
  selectedMethods$: Observable<Method[]>;

  constructor(private store: Store<PlayState>) {}

  ngOnInit() {
    this.selectedMethods$ = this.store.pipe(select(getSelectedMethods));
  }
}
