import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  PlayMethod,
  PlayMethodChange
} from '../../interfaces/method.interface';
import { FormFieldChange } from '../form/form.interface';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'rr-play-chaining-picker',
  templateUrl: './chaining-picker.component.html',
  styleUrls: ['./chaining-picker.component.scss']
})
export class ChainingPickerComponent implements OnInit {
  @Input() methods: PlayMethod[];
  @Output() onAdd = new EventEmitter<PlayMethodChange>();
  @Output() onUpdate = new EventEmitter<PlayMethodChange>();

  showInput: { [key: string]: boolean } = {};

  constructor() {}

  ngOnInit() {}

  getMethod(name: string): PlayMethod {
    return this.methods.find(it => it.name === name);
  }

  didFieldChange($event: FormFieldChange) {
    const method: PlayMethod = this.getMethod($event.field.name);
    this.showInput[method.name] = $event.event.checked;

    this.onAdd.emit(<PlayMethodChange>{
      ...$event,
      method: method
    });
  }

  didFieldValueChange($event: FormFieldChange) {
    const method: PlayMethod = this.getMethod($event.field.name);
    this.onUpdate.emit(<PlayMethodChange>{
      ...$event,
      method: method
    });
  }

  // ngDoCheck() {
  //   console.log('this is awesome');
  // }
}
