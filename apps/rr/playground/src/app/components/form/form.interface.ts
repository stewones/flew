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
  type: 'boolean' | 'callback';
}
