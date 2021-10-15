import {
  FormFieldChange,
  FormFieldType
} from '../components/form/form.interface';
import { PlayPlatform } from './play.interface';

export interface PlayMethod {
  name: string;
  placeholder: string;
  description?: string;
  type?: FormFieldType;
  default?: string;
  platform: Array<PlayPlatform>;
  value?: any;
  valueTransform?: any;
  target: 'chain' | 'verb';
  disabled?: boolean;
  options?: any;
}

export interface PlayMethodChange extends FormFieldChange {
  method: PlayMethod;
}
