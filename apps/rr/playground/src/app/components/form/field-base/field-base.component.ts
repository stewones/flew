import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { FormField } from '../form.interface';

@Component({
  selector: 'rr-play-field-base',
  templateUrl: './field-base.component.html',
  styleUrls: ['./field-base.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldBaseComponent implements OnInit {
  @Input() data: FormField = <FormField>{};

  constructor() {}

  ngOnInit() {}
}
