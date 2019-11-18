import { MatCheckboxChange, MatRadioChange } from '@angular/material';

export type FormFieldType =
  | 'boolean'
  | 'assert'
  | 'callback'
  | 'where' // @todo
  | 'query' // @todo
  | 'select';

export interface FormFieldOption {
  name: string;
  label: string;
  onChange: any;
  meta: any;
  required: boolean;
}

export interface FormField {
  name: string;
  placeholder: string;
  type: FormFieldType;
  value: any;
  disabled: boolean;
  options: any;
  color: string;
}

export interface FormFieldChange {
  event: any;
  field: FormField;
}

export type FormFieldChangeEvent = MatCheckboxChange | MatRadioChange | any;
