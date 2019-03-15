import { FormField } from '../form.interface';
import { ThemePalette } from '@angular/material';

export interface FormFieldBoolean extends FormField {
  disabled: boolean;
  labelPosition: 'before' | 'after';
  indeterminate: boolean;
  checked: boolean;
  color: ThemePalette;
}
