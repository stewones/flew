import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { FormField } from '../form.interface';

@Component({
  selector: 'rr-play-field-boolean',
  templateUrl: './field-boolean.component.html',
  styleUrls: ['./field-boolean.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldBooleanComponent extends FieldBaseComponent
  implements OnInit {
  @Input() data: FormField = <FormField>{};
  ngOnInit() {}
}
