import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Method, MethodChange } from '../../interfaces/method.interface';
import { PlayState } from '../../+play/play.reducer';
import { getAllMethods } from '../../+play/method/method.selectors';
import { FormFieldChangeEvent } from '../../components/form/form.interface';
import {
  RemoveChainMethod,
  AddChainMethod,
  UpdateChainMethod
} from '../../+play/method/method.actions';

@Component({
  selector: 'rr-play-chaining-picker-container',
  templateUrl: './chaining-picker-container.component.html',
  styleUrls: ['./chaining-picker-container.component.css']
})
export class ChainingPickerContainerComponent implements OnInit {
  methods$: Observable<Method[]>;
  constructor(private store: Store<PlayState>) {}

  ngOnInit() {
    this.methods$ = this.store.pipe(select(getAllMethods));
  }

  addMethod(payload: Method) {
    this.store.dispatch(new AddChainMethod(payload));
  }

  removeMethod(payload: Method) {
    this.store.dispatch(new RemoveChainMethod(payload));
  }

  updateMethod(payload: Method) {
    this.store.dispatch(new UpdateChainMethod(payload));
  }

  didAddMethod($event: MethodChange) {
    const event: FormFieldChangeEvent = $event.event;

    if (event.checked) {
      // add to chainig
      this.addMethod($event.method);
    } else {
      // remove from chaining
      this.removeMethod($event.method);
    }
  }

  didUpdateMethod($event: MethodChange) {
    const event: FormFieldChangeEvent = $event.event;
    this.updateMethod({ ...$event.method, ...{ value: event.value } });
  }

  getInstrumentation() {
    const text = document.getElementsByTagName<any>(
      'rr-play-chaining-api-container'
    )[0].innerText;

    return text
      .split(`\n`)
      .join('')
      .split(`  `)
      .join('');
  }

  executeCollection() {
    const instruments = this.getInstrumentation();
    console.log(instruments);
  }
}
