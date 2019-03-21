import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  PlayMethod,
  PlayMethodChange
} from '../../interfaces/method.interface';
import { PlayState } from '../../+play/play.reducer';
import { getAllMethods } from '../../+play/method/method.selectors';
import { FormFieldChangeEvent } from '../../components/form/form.interface';
import {
  RemoveChainMethod,
  AddChainMethod,
  UpdateChainMethod
} from '../../+play/method/method.actions';

import { map } from 'rxjs/operators';

@Component({
  selector: 'rr-play-chaining-picker-container',
  templateUrl: './chaining-picker-container.component.html',
  styleUrls: ['./chaining-picker-container.component.css']
})
export class ChainingPickerContainerComponent implements OnInit, OnDestroy {
  target: 'browser' | 'server' = 'browser';
  methods$: Observable<PlayMethod[]>;

  constructor(private store: Store<PlayState>) {}

  ngOnInit() {
    this.loadMethodsFor('browser');
  }

  ngOnDestroy() {}

  addMethod(payload: PlayMethod) {
    this.store.dispatch(new AddChainMethod(payload));
  }

  removeMethod(payload: PlayMethod) {
    this.store.dispatch(new RemoveChainMethod(payload));
  }

  updateMethod(payload: PlayMethod) {
    this.store.dispatch(new UpdateChainMethod(payload));
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

  loadMethodsFor(target: 'browser' | 'server' = 'browser') {
    this.methods$ = this.store.pipe(
      select(getAllMethods),
      map((methods: PlayMethod[]) =>
        methods.filter(
          it => it.target === 'chain' && it.platform.includes(target)
        )
      )
    );
    this.target = target;
  }
}
