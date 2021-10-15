import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { FormFieldBoolean } from '../field-boolean/field-boolean.interface';
import { MatRadioChange } from '@angular/material';

@Component({
  selector: 'play-field-assert',
  templateUrl: './field-assert.component.html',
  styleUrls: ['./field-assert.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldAssertComponent extends FieldBaseComponent implements OnInit {
  @Input() data: FormFieldBoolean = <FormFieldBoolean>{};

  ngOnInit() {}

  didChange($event: MatRadioChange) {
    $event.value = $event.value === 'true' ? 'true' : 'false';
    super.didChange($event);
  }
}
