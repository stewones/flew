import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { FormField } from '../form.interface';

@Component({
  selector: 'rr-play-field-callback',
  templateUrl: './field-callback.component.html',
  styleUrls: ['./field-callback.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldCallbackComponent extends FieldBaseComponent
  implements OnInit {
  @Input() data: FormField = <FormField>{};
  ngOnInit() {}
}
