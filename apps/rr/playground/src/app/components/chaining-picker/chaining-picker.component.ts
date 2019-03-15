import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Method, MethodChange } from '../../interfaces/method.interface';
import { FormFieldChange } from '../form/form.interface';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'rr-play-chaining-picker',
  templateUrl: './chaining-picker.component.html',
  styleUrls: ['./chaining-picker.component.scss']
})
export class ChainingPickerComponent implements OnInit {
  @Input() methods: Method[];
  @Output() onAdd = new EventEmitter<MethodChange>();
  @Output() onUpdate = new EventEmitter<MethodChange>();

  showInput: { [key: string]: boolean } = {};

  constructor() {}

  ngOnInit() {}

  getMethod(name: string): Method {
    return this.methods.find(it => it.name === name);
  }

  didFieldChange($event: FormFieldChange) {
    const method: Method = this.getMethod($event.field.name);
    this.showInput[method.name] = $event.event.checked;

    this.onAdd.emit(<MethodChange>{
      ...$event,
      method: method
    });
  }

  didFieldValueChange($event: FormFieldChange) {
    const method: Method = this.getMethod($event.field.name);

    this.onUpdate.emit(<MethodChange>{
      ...$event,
      method: method
    });
  }

  // ngDoCheck() {
  //   console.log('this is awesome');
  // }
}
