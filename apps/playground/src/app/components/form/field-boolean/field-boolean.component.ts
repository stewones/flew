import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { FormFieldBoolean } from './field-boolean.interface';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'rr-play-field-boolean',
  templateUrl: './field-boolean.component.html',
  styleUrls: ['./field-boolean.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldBooleanComponent extends FieldBaseComponent
  implements OnInit {
  @Input() data: FormFieldBoolean = <FormFieldBoolean>{};

  ngOnInit() {}

  didChange($event: MatCheckboxChange) {
    super.didChange($event);
  }
}
