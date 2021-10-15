import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormField, FormFieldChange } from '../form.interface';

@Component({
  selector: 'play-field-base',
  template: ``,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldBaseComponent implements OnInit {
  @Input() data: FormField = <FormField>{};
  @Output() onChange = new EventEmitter<FormFieldChange>();

  constructor() {}

  ngOnInit() {}

  didChange($event: any) {
    this.onChange.emit(<FormFieldChange>{ field: this.data, event: $event });
  }
}
