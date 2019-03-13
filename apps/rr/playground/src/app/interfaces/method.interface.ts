export interface Method {
  name: string;
  description: string;
  type: 'boolean' | 'callback';
  default: string;
  platform: Array<'browser' | 'server'>;
}
