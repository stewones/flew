import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  PlayMethod,
  PlayMethodChange
} from '../../interfaces/method.interface';

import { PlayPlatform } from '../../interfaces/play.interface';
import { FormFieldChangeEvent } from '../../components/form/form.interface';

import { PlayState } from '../../+state/play.state';
import {
  AddMethod,
  RemoveMethod,
  UpdateMethod
} from '../../+state/method/method.actions';

@Component({
  selector: 'play-chaining-picker-container',
  templateUrl: './chaining-picker-container.component.html',
  styleUrls: ['./chaining-picker-container.component.css']
})
export class ChainingPickerContainerComponent implements OnInit, OnDestroy {
  target: PlayPlatform;
  target$: Subscription;
  methods$: Observable<PlayMethod[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.target$ = this.store
      .select(PlayState.selectedPlatform)
      .pipe(tap(platform => this.loadMethodsFor(platform)))
      .subscribe();
  }

  ngOnDestroy() {
    this.target$.unsubscribe();
  }

  addMethod(payload: PlayMethod) {
    this.store.dispatch(new AddMethod(payload));
  }

  removeMethod(payload: PlayMethod) {
    this.store.dispatch(new RemoveMethod(payload));
  }

  updateMethod(payload: PlayMethod) {
    this.store.dispatch(new UpdateMethod(payload));
  }

  didAddMethod($event: PlayMethodChange) {
    const event: FormFieldChangeEvent = $event.event;

    if (event.checked) {
      // add to chainig
      this.addMethod($event.method);
    } else {
      // remove from chaining
      this.removeMethod($event.method);
    }
  }

  didUpdateMethod($event: PlayMethodChange) {
    const event: FormFieldChangeEvent = $event.event;
    this.updateMethod({ ...$event.method, ...{ value: event.value } });
  }

  loadMethodsFor(target: PlayPlatform = 'browser') {
    this.methods$ = this.store
      .select(PlayState.methods)
      .pipe(
        map((methods: PlayMethod[]) =>
          methods.filter(
            it => it.target === 'chain' && it.platform.includes(target)
          )
        )
      );

    this.target = target;
  }
}
