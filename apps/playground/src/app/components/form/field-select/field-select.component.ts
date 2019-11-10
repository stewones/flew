import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { FormField } from '../form.interface';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'rr-play-field-select',
  templateUrl: './field-select.component.html',
  styleUrls: ['./field-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldSelectComponent extends FieldBaseComponent implements OnInit {
  @Input() data: FormField = <FormField>{};
  ngOnInit() {}

  didChange($event: MatSelectChange) {
    // $event.value = this.data.value;
    console.log(this.data);
    super.didChange({
      ...this.data,
      value: $event.value
    });
  }
}
