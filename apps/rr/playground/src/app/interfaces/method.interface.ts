import { FormFieldChange } from '../components/form/form.interface';

export interface Method {
  name: string;
  placeholder: string;
  description: string;
  type: 'boolean' | 'callback' | 'executor' | 'where' | 'query';
  default: string;
  platform: Array<'browser' | 'server'>;
  value?: any;
}

export interface MethodChange extends FormFieldChange {
  method: Method;
}
