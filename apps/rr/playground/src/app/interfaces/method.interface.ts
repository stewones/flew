import { FormFieldChange } from '../components/form/form.interface';

export interface PlayMethod {
  name: string;
  placeholder: string;
  description: string;
  type: 'boolean' | 'callback' | 'executor' | 'where' | 'query';
  default: string;
  platform: Array<'browser' | 'server'>;
  value?: any;
}

export interface PlayMethodChange extends FormFieldChange {
  method: PlayMethod;
}
