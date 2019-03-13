import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Method, MethodState } from '../../methods.reducer';
import { methodsQuery } from '../../methods.selectors';

@Component({
  selector: 'rr-play-chaining-picker-container',
  templateUrl: './chaining-picker-container.component.html',
  styleUrls: ['./chaining-picker-container.component.css']
})
export class ChainingPickerContainerComponent implements OnInit {
  methods$: Observable<Method[]>;
  constructor(private store: Store<MethodState>) {}

  ngOnInit() {
    this.methods$ = this.store.pipe(select(methodsQuery.getAllMethods));
  }
}
