import {
  FormFieldChange,
  FormFieldType
} from '../components/form/form.interface';

export interface PlayMethod {
  name: string;
  placeholder: string;
  description?: string;
  type?: FormFieldType;
  default?: string;
  platform: Array<'browser' | 'server'>;
  value?: any;
  valueTransform?: any;
  target: 'chain' | 'exec';
  disabled?: boolean;
  options?: any;
}

export interface PlayMethodChange extends FormFieldChange {
  method: PlayMethod;
}
